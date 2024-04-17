export type ItemData = {
    id: number;
    name: string;
    calculated: number;
    frameType: number;
    elder: boolean;
    shaper: boolean;
    blighted: boolean;
    uberBlighted: boolean;
    baseType: string;
    links: number;
    quality: number;
    ilvl: number;
    level: number;
    corrupted: boolean;
    totalStacksize: number;
    icon: string;
    tier: number;
    count: number;
    leagueType: number;
    searchCode: string;
    variant: string;
    history: string|null;
    historyLeague: string|null;
    min: number;
    cateGory: string;
    filterData: Record<string, any>
};
