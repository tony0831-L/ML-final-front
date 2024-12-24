export interface Message {
    lc: number; // 表示某個計數，通常是整數
    type: string; // 表示該信息的類型，這裡是 'constructor'
    id: string[]; // 一個字符串數組，表示 ID 的組成部分
    kwargs: {
        content: string; // 信息的內容，這裡是 AI 的消息
        tool_calls: unknown[]; // 一個數組，可以包含任何類型的工具調用
        invalid_tool_calls: unknown[]; // 一個數組，包含無效的工具調用
        additional_kwargs: Record<string, unknown>; // 額外的關鍵字參數，為鍵值對形式
        response_metadata: Record<string, unknown>; // 響應元數據，為鍵值對形式
        id: string; // 唯一的 ID
    };
}