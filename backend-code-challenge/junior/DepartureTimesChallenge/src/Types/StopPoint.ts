export interface StopPoint {
    naptanId: string;
    commonName: string;
    modes: string[];
    distance: number;
    lines: Line[];
}

interface Line {
    id: string;
    name: string;
}
