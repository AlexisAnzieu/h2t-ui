<template>
    <el-row class="layout" :gutter="24">
        <el-col :span="24">
            <h1>🐣🐣 Cet oeuf est en cours de couvaison 🐣🐣</h1>
            <div class="description">
                L'objectif de cette page est de fournir aux internautes des
                astuces écologiques à mettre en place ou des lieux locaux bio à
                tester. <br />
                <br />
                Si tu souhaites aider à compléter cette partie n'hésite pas à
                envoyer un mail à
                <a
                    rel="noopener noreferrer"
                    target="_blank"
                    :href="`mailto:contact@h2t.club?subject=Je souhaite apporter mon soutien à l'oeuf écologique`"
                    >contact@h2t.club</a
                >
            </div>
            <div>
                <el-progress :width="300" type="circle" :percentage="5">
                </el-progress>
                <br /><br />
                Progression de la couvaison
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    auth: false,
};
</script>

<style>
.description {
    padding-top: 20px;
    font-size: 20px;
}

.layout {
    padding-left: 40px;
    text-align: center;
}

@media screen and (max-width: 600px) {
    .layout {
        padding-left: 20px;
    }
}
</style>
