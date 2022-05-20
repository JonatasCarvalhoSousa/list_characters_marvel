interface ResponseData {
    id: string;
    name: string;
    description: string;
    series: {
        id: string;
        title: string;
        description: string;
    }
    events: {
        id: string;
        title: string;
        description: string;
    }
    thumbnail: {
        path: String;
        extension: String;
    };
}

export default ResponseData;