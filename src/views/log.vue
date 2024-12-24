<template>
    <div id="container">
        <el-card shadow="always" v-loading="loading" v-if="session?.subject">
            <template #header>
                <div class="card-header">
                    <p>🧐 主題: {{ session.subject }}</p>
                    <p>thread-id: {{ session._id }}</p>
                </div>
            </template>
            <div id="wrapper">
                <div class="placeHoder" v-if="messages?.length == 0">
                    <h1>
                        🤔讓我們來討論<span class="title">{{ session.subject }}</span>, 相關的問題吧
                    </h1>
                </div>
                <div class="messages" v-for="(message, index) in messages" :key="index" v-else>
                    <div class="info">
                        <img src="https://omg.ethci.app/assets/ollama.png" alt=""
                            v-if="message.id[message.id.length - 1] != 'HumanMessage'">
                        <i class="bi bi-person-fill" v-else></i>
                        {{ message.id[message.id.length - 1] == 'HumanMessage' ? "user" : "Assistant" }}
                    </div>
                    <VueMarkdown class="text" :source="message.kwargs.content" :options="mdConfig" :pluguns="plugins"
                        @rendered="update" />
                </div>
            </div>
            <template #footer>
                <div class="input">
                    <div class="btns">
                        <i class="bi bi-paperclip"></i>
                        <input type="text" placeholder="傳送訊息" v-model="question" @keyup.enter="submit" v-if="!pending">
                        <input type="text" placeholder="🤔Assistant 正在思考.." disabled v-else>
                        <i class="bi bi-arrow-up submit" @click="submit"></i>
                    </div>
                </div>
            </template>
        </el-card>
        <chooseDoc @set-subject="setSubject" v-else />
    </div>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { asyncGet, asyncPatch, asyncPost, asyncPut } from '../utils/fetch';
import { apis } from '../enums/apis';
import { resp } from '../interfaces/resp';
import { Message } from '../interfaces/message';
import VueMarkdown, { Options } from 'vue-markdown-render'
import chooseDoc from "../components/chooseDoc.vue"
import MarkdownItAnchor from 'markdown-it-anchor';
import Prism from "prismjs";
import { Session } from '../interfaces/Session';
import { ElMessage } from 'element-plus';

const loading = ref<boolean>(true);
const route = useRoute();
const messages = ref<Array<Message>>();
const session = ref<Session>();
const question = ref<string>();
const pending = ref<boolean>(false)

const mdConfig: Options = {
    typographer: true,
    linkify: true,
}

const plugins = [MarkdownItAnchor];

const update = async () => {
    await nextTick();
    //@ts-ignore
    import('prismjs/components/prism-jsx')
    //@ts-ignore
    import('prismjs/components/prism-python')
    //@ts-ignore
    import('prismjs/components/prism-java')
    //@ts-ignore
    import('prismjs/components/prism-nginx')
    //@ts-ignore
    import('prismjs/components/prism-bash')
    //@ts-ignore
    import('prismjs/components/prism-typescript')
    //@ts-ignore
    import('prismjs/components/prism-swift')

    Prism.highlightAll();
};

const setSubject = async (link: string, title: string) => {
    if (session.value) {
        await asyncPut(apis.addDoc, {
            sid: session.value.sid,
            url: link,
        })

        await asyncPatch(apis.setTitle, {
            id: session.value._id,
            title: title
        })

        await syncSession()
    }

}

const submit = async () => {
    if (question.value) {
        pending.value = true
        const resp: resp<any> = await asyncPost(apis.askWithDoc, {
            text: question.value,
            ...session.value
        })

        if (resp.code == 200) {
            messages.value = resp.body.messages
            question.value = ""
        }

        pending.value = false
    } else {
        ElMessage.error(`😅不能發送空訊息`);
    }
    await nextTick();
    await update();
}

const syncLog = async () => {
    if (session.value) {
        const res: resp<any> = await asyncGet(`${apis.getLogBySid}?id=${session.value.sid}`)
        if (res.code == 200 && res.body) {
            messages.value = res.body;
        } else {
            messages.value = []
        }
    }

    await nextTick();
    await update();
}

const syncSession = async () => {
    const res: resp<Session> = await asyncGet(`${apis.findById}?id=${route.params.id}`);
    if (res.code == 200) {
        session.value = res.body;
    }

    await nextTick();
    await update();
}


onMounted(async () => {
    await syncSession();
    await syncLog();

    loading.value = false;

    await nextTick();
    await update();
});
</script>

<style lang="scss" scoped>
::v-deep {
    .el-card {
        width: 60%;
        border-radius: .3rem;
    }

    .el-card__footer {
        border: none;
    }

    .el-card__body {
        max-height: 70vh;
        height: 70vh;
        overflow-y: scroll;
    }
}

.btn {
    transition: all .5s;
    cursor: pointer;

    &:hover {
        font-size: 1.025rem;
        background-color: #21212160;
        color: #fcfcfc;
        border-radius: .3rem;
        padding: 1%;
    }
}

#container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .card-header {
        display: flex;
        justify-content: space-between;

        .newSession {
            font-weight: bolder;

            &:hover {
                padding: .5%;
                background-color: #21212180;
            }
        }
    }

    #wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        height: 100%;

        .placeHoder {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
            white-space: nowrap;

            .title {
                color: #fcfcfc;
                background-color: #21212150;
                padding: .5% 1%;
            }

            h1,
            .title {
                font-size: 1.5rem;
            }
        }

        .messages {
            display: flex;
            flex-direction: column;
            gap: 0.1rem;

            .text {
                margin-left: 2.3rem;
                line-height: 1.75rem;
            }

            .info {
                display: flex;
                align-items: center;
                font-weight: bolder;
                gap: .5rem;

                i {
                    font-size: 1.5rem;
                }

                img,
                i {
                    width: 30px;
                    height: 30px;
                    border-radius: 99%;
                }
            }

        }

        .right {
            align-self: flex-end;
        }
    }

    .input {
        width: 100%;

        .btns {
            width: 60%;
            display: flex;
            justify-content: space-between;
            margin: auto;
            border: solid 1px rgba(33, 33, 33, 0.3764705882);
            border-radius: 0.5rem;
            align-items: center;
            padding: .5% 1%;

            i {
                border-radius: 0.5rem;
                font-weight: bolder;
                font-size: 2rem;
                color: #212121;
                cursor: pointer;
            }

            input {
                border-radius: 0.5rem;
                color: #212121;
                flex: 1;
                padding: .5rem;
                border: none;
                outline: none;
                // ::out
            }
        }

    }

    #footWrapper {
        width: 100%;
        height: 100%;
        display: flex;
        gap: 1rem;
        align-items: center;
    }
}
</style>