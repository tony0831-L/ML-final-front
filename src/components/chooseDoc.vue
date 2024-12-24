<template>
    <div id="container">
        <el-card shadow="always">

            <template #header>
                <div class="card-header">
                    <p>🧐 選擇一個主題</p>
                </div>
            </template>

            <div id="wrapper">
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/utility-types.html', 'Utility Types')">Utility Types</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/cheatsheets/', 'Cheat Sheets')">Cheat Sheets</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/decorators.html', 'Decorators')">Decorators</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/declaration-merging.html', 'Declaration Merging')">Declaration Merging</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/enums.html', 'Enums')">Enums</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html', 'Iterators and Generators')">Iterators and Generators</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/jsx.html', 'JSX')">JSX</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/mixins.html', 'Mixins')">Mixins</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/namespaces.html', 'Namespaces')">Namespaces</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html', 'Namespaces and Moduless')">Namespaces and Moduless</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/symbols.html', 'Symbols')">Symbols</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html', 'Triple-Slash Directives')">Triple-Slash Directives</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/type-compatibility.html', 'Type Compatibility')">Type Compatibility</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/type-inference.html', 'Type Inference')">Type Inference</div>
                <div class="subject" @click="ClickHandler('https://www.typescriptlang.org/docs/handbook/variable-declarations.html', 'Variable Declaration')">Variable Declaration</div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
const emitEvents = defineEmits(['setSubject'])

const ClickHandler = (link: string,title:string) => {
    emitEvents('setSubject',link,title)
};
</script>

<style lang="scss" scoped>
::v-deep {
    .el-card {
        width: 60%;
        border-radius: .3rem;
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
        font-weight: bolder;
    }

    #wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        .subject{
            cursor: pointer;
            &:hover{
                font-size: 1.05rem;
                font-weight: bolder;
            }
        }
    }
}
</style>