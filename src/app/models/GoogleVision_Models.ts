export class GoogleVisionResult{
    responses: GoogleVisionResponses[];
}


export class GoogleVisionResponses {
    labelAnnotations: GoogleVisionLabelAnnotations[];
}

export  class GoogleVisionLabelAnnotations {
    mid: string;
    description: string;
    score: number;
    topicality: number;
}





