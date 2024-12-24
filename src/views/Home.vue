<template>
  <div id="container">
    <el-card shadow="always" v-loading="loading">
      <template #header>
        <div class="card-header">
          <p>👌 ip: {{ sessions ? sessions[0].ip : "" }}</p>
          <p class="newSession btn" @click="insertHandler"> 新增對話 + </p>
        </div>
      </template>
      <div id="wrapper">
        <h3>紀錄:</h3>
        <div class="log btn" v-for="(session, index) in sessions" :key="index" @click="ClickHandler(session)">
          <div class="left">
            {{ index + 1 }}. {{ session.subject?'🤔討論'+session.subject: '😅尚未選擇主題'}}
          </div>
          <div class="right">
            🕑{{ session.createTime }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { asyncGet } from "../utils/fetch";
import { apis } from "../enums/apis";
import { resp } from "../interfaces/resp";
import { useRouter } from "vue-router";
import { Session } from "../interfaces/Session";
import { ElMessage } from "element-plus";

const loading = ref<boolean>(true);
const sessions = ref<Array<Session>>();
const router = useRouter();

const ClickHandler = (session: Session) => {
  router.push(`/log/${session._id}`)
};

const syncData = async () => {
  const res: resp<Array<Session>> = await asyncGet(apis.findByIp);

  if (res.body.length) {
    sessions.value = res.body;
  } else {
    ElMessage.error(`🧐 當前ip沒有紀錄, 正在新增`);
    const newSession = await insertOne();

    if (newSession) {
      ElMessage({
        message: '🤗 新增完畢',
        type: 'success',
      });

      const temp: Array<Session> = [];
      temp.push(newSession);
      sessions.value = temp;
    }
  }

  loading.value = false;
}

const insertHandler = async () => {
  const newSession = await insertOne();

  if (newSession) {
    ElMessage({
      message: '🤗 新增完畢',
      type: 'success',
    });
    sessions.value?.push(newSession);
  }
}

const insertOne = async () => {
  const res: resp<Session> = await asyncGet(`${apis.insertOne}?id=${sessions.value?.length}`);
  if (res.code == 200) {
    return res.body;
  } else {
    ElMessage.error(`😅 新增失敗`);
  };
}

onMounted(() => {
  syncData();
});
</script>

<style lang="scss" scoped>
::v-deep {
  .el-card {
    width: 60%;
    border-radius: .3rem;
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
    gap: 1.25rem;

    .log {
      display: flex;
      justify-content: space-between;
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