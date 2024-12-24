import { MutipleSessionLog } from "./MutipleSessionLog";
import { SessionLog } from "./SessionLog";

export interface examLog {

    _id?:string

    /**
     * fk:uid 用戶id
     */
    uid:string;

    /**
     * 受試日期
     */
    date:string;

    /**
     * 受試次數
     */
    trialsCount: number;

    /**
     * A老師對話
     */
    A_Dialogue: SessionLog;

    /**
     * B老師對話
     */
    B_Dialogue: SessionLog;

    /**
     * C老師對話
     */
    C_Dialogue: SessionLog;

    /**
    * D老師對話
    */
    D_Dialogue: SessionLog;

    /**
     * E老師對話
     */
    E_Dialogue: SessionLog;

    /**
     * 研究人員評分一對新進教師的說話態度評分
     */
    ResearcherRatingOne: number;

    /**
     * 研究人員評分二對資深教師的說話態度評分
     */
    ResearcherRatingTwo: number;

    /**
     * 研究人員評分三對家長通話的說話態度與技巧評分
     */
    ResearcherRatingThree: number;

    /**
    * 研究人員評分四對教師向家長進行簡報能力的評分
    */
    ResearcherRatingFour: number;

    /**
     * 研究人員評分五對教師回覆家長提問能力的評分
     */
    ResearcherRatingFive: number;

    /**
     * 請教資深教師
     */
    seniorTeacherDialogue: SessionLog;

    /**
     * 家長打電話
     */
    parentPhoneCall: Array<MutipleSessionLog>;

    /**
     * 確認邀請卡
     */
    ConfirmInvitationCard: boolean;

    /**
     * 回覆家長提問
     */
    parentQuestionsDialogue: Array<MutipleSessionLog>;

    /**
     * 回覆家長個別問題
     */
    parentsIndividualQuestionsDialogue: Array<MutipleSessionLog>;

    /**
     * 完成任務數
     */
    taskFinishCount: number;

    /**
     * 總分
     */
    finalScore: number;

    /**
     * 是否可寫入
     */
    islock: boolean;

}