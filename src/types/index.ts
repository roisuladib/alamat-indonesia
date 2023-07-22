export type TRegional = {
   code: string;
   name: string;
};

export type TProvince = TRegional;
export type TRegency = TRegional & {
   province_code: string;
};
export type TDistrict = TRegional & {
   regency_code: string;
};
export type TVillage = TRegional & {
   district_code: string;
};
