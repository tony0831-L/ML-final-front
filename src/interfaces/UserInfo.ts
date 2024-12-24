export interface UserInfo {
        /**
         * 受試者姓名
         */
        name: string;

        /**
         * 性別
         */
        gender: "male" | "female";

        /**
         * 系級
         */
        department: string;

        /**
         * 任教科別
         */
        subject: string;

        /**
         * 通行編號
         */
        accessToken?:number;
}