import fs from "fs";
import path from "path";

import { PodcastModel } from "../models/podcast-model";

const pathData = path.join(__dirname, "../repositories/podcasts.json");

export const repositoryPodcast = async (
    podcastName?: string
): Promise<PodcastModel[]> => {
    const language = "utf-8";

    const rawData = fs.readFileSync(pathData, language);
    let jsonFile = JSON.parse(rawData);

    if (podcastName) {
        jsonFile = jsonFile.filter(
            (podcast: PodcastModel) => podcast.podcastName === podcastName
        );

        return jsonFile;
    }
    return jsonFile;
};

export const repositoryPodcastAddComment = async (
    videoId: string,
    user: string,
    comment: string
): Promise<PodcastModel[]> => {
    const language = "utf-8";

    const rawData = fs.readFileSync(pathData, language);
    let jsonFile = JSON.parse(rawData);

    const rowIndex = jsonFile.findIndex((podcast: PodcastModel) => podcast.videoId === videoId);

    jsonFile[rowIndex].comments.push({user, comment});

    fs.writeFileSync(pathData, JSON.stringify(jsonFile));

    return jsonFile[rowIndex];
};

export const repositoryPodcastAddRating = async (
    videoId: string,
    rating: number
): Promise<PodcastModel[]> => {
    const language = "utf-8";

    const rawData = fs.readFileSync(pathData, language);
    let jsonFile = JSON.parse(rawData);

    const rowIndex = jsonFile.findIndex((podcast: PodcastModel) => podcast.videoId === videoId);

    jsonFile[rowIndex].ratings.push(Number(rating));

    fs.writeFileSync(pathData, JSON.stringify(jsonFile));

    return jsonFile[rowIndex];
};