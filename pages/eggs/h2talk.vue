<template>
    <div class="body">
        <el-col :lg="{ span: 21, offset: 1 }" :md="24" style="padding: 10px">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="H2TALK ZERO" name="zero">
                    <template slot="title">
                        <h2 style="text-align: center">H2TALK ZERO</h2>
                    </template>
                    <el-card class="box-card">
                        <div class="description">
                            <div style="text-align: left; margin-bottom: 20px">
                                Zéro préparation, zéro sujet prédéfini, zéro
                                expérience. Tour de passe-passe écologique,
                                spirituel, éducatif et rêveur entre les copains
                                du Plateau Clémentin, Hugo, Sandro et Alexis.
                            </div>

                            <iframe
                                title="S01"
                                src="https://open.spotify.com/embed-podcast/episode/3LfY19oLQZZGrWhWvssp12"
                                :width="$device.isMobile ? '100%' : '60%'"
                                height="232"
                                allow="encrypted-media"
                            ></iframe>
                            <iframe
                                title="S01"
                                src="https://open.spotify.com/embed-podcast/episode/5ql32D74gwj9fbg9Epf6OH"
                                :width="$device.isMobile ? '100%' : '60%'"
                                height="232"
                                allow="encrypted-media"
                            ></iframe>
                            <iframe
                                title="S01"
                                src="https://open.spotify.com/embed-podcast/episode/6ezMhTXrRSwA34l7MuGX92"
                                :width="$device.isMobile ? '100%' : '60%'"
                                height="232"
                                allow="encrypted-media"
                            ></iframe>
                            <iframe
                                title="S01"
                                src="https://open.spotify.com/embed-podcast/episode/7vRnTg6YKLFPzKpIJG5xzk"
                                :width="$device.isMobile ? '100%' : '60%'"
                                height="232"
                                allow="encrypted-media"
                            ></iframe>
                            <iframe
                                title="S01"
                                src="https://open.spotify.com/embed-podcast/episode/6M03OOmoQfooifOTttm8lo"
                                :width="$device.isMobile ? '100%' : '60%'"
                                height="232"
                                allow="encrypted-media"
                            ></iframe>
                            <iframe
                                title="S01"
                                src="https://open.spotify.com/embed-podcast/episode/1ZXtkGH7oilKjQyfwx2XBl"
                                :width="$device.isMobile ? '100%' : '60%'"
                                height="232"
                                allow="encrypted-media"
                            ></iframe>
                            <iframe
                                title="S01"
                                src="https://open.spotify.com/embed-podcast/episode/2NL8nqmBNDuGF3oT5ALsP5"
                                :width="$device.isMobile ? '100%' : '60%'"
                                height="232"
                                allow="encrypted-media"
                            ></iframe>
                            <iframe
                                title="S01"
                                src="https://open.spotify.com/embed-podcast/episode/2IFTScXIa4CEIrWutNteyp"
                                :width="$device.isMobile ? '100%' : '60%'"
                                height="232"
                                allow="encrypted-media"
                            ></iframe>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "H2T.talk",
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    hid: "description",
                    name: "description",
                    content:
                        "Podcasts locaux du centre de Mont-Royal, en lien avec les valeurs H2T de partage et de bienveillance",
                },
                { hid: "title", property: "og:title", content: "H2T.talk" },
                {
                    hid: "image",
                    property: "og:image",
                    content: "/images/facebook-logo-OG-talk.png",
                },
                { property: "fb:app_id", content: "2367260910156432" },
            ],
        };
    },
    auth: false,
    data() {
        return {
            activeName: "zero",
        };
    },
};
</script>

<style>
.subtitle {
    font-size: 15px;
    color: #999;
}
.body {
    text-align: center;
}

.description {
    padding: 20px;
}

iframe {
    border: 0;
}
</style>
