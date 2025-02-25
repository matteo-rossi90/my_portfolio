<script>
import axios from 'axios';
import { Chart } from 'chart.js/auto';

import Sidenav from '../partials/Sidenav.vue';
import HeaderDashboard from '../partials/HeaderDashboard.vue';
import ProjectList from './projects/ProjectList.vue';
import Loader from '../partials/Loader.vue';

export default {
    name: 'Dashboard',
    components:{
        Sidenav,
        HeaderDashboard,
        ProjectList,
        Loader
    },
    data() {
        return {
            name: '',
            projects:[],
            types:[],
            techs:[],
            views:[],
            totalViews:{},
            projectsByType: [],
            projectsByMonths: [],
            chartProjects: null,
            chartViews: null,
            isNull: false,
            isLoading: true
        }
    },
    methods:{
        loadProjects(){
            axios
                .get("/api/dashboard/progetti")
                .then((response) => {
                    console.log(response.data)
                    this.projects = response.data
                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        loadTypes(){
            axios
                .get('/api/dashboard/tipi')
                .then((response) => {
                    console.log(response.data)
                    this.types = response.data;

                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        loadTechs(){
            axios
                .get('/api/dashboard/tecnologie')
                .then((response) => {
                    console.log(response.data)
                    this.techs = response.data;

                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        loadViews(){
            axios
                .get('/api/dashboard/visite-totali')
                .then((res) => {
                    console.log(res.data)
                    this.totalViews = res.data;
                })
                .catch((error) =>{
                    console.log(error)
                })
        },
        loadProjectsPerType() {
            if (this.chartProjects) this.chartProjects.destroy();

            axios.get('/api/dashboard/progetti-per-tipo')
                .then((res) => {
                    this.projectsByType = res.data;
                    this.renderProjectsChart();
                })
                .catch((error) => {
                    console.error(error);
                })
        },
        loadProjectsViews(){
            if (this.chartViews) this.chartViews.destroy();

            axios.get('/api/dashboard/visite-mensili')
                .then((res) => {
                    this.projectsByMonths = res.data;
                    this.renderViewsChart();
                })
                .catch((error) => {
                    console.error(error);
                })
        },
        renderProjectsChart() {

            if(!this.projectsByType.length) return;

            // Se il canvas non esiste o è nascosto, non fare nulla
            const canvas = document.getElementById('projectsChart');
            if (!canvas || canvas.offsetParent === null) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            if (this.chartProjects) {
                this.chartProjects.destroy();
                this.chartProjects = null;
            }

            this.chartProjects = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: this.projectsByType.map(p => p.type_name),
                    datasets: [{
                        data: this.projectsByType.map(p => p.count),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ],
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    // aspectRatio: 2,
                    cutout: '60%',
                    // animation: {
                        // duration: 1000, // Durata dell'animazione
                        // easing: 'easeInOut', // Easing predefinito (puoi provarne diversi)
                        // animateRotate: true, // Abilita la rotazione
                        // animateScale: true,  // Abilita la scalatura
                    // },
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    resizeDelay: 500
                }
            });
        },
        renderViewsChart(){
            if (!this.projectsByMonths.length) return;

            // Se il canvas non esiste o è nascosto, non fare nulla
            const canvas = document.getElementById('viewChart');
            if (!canvas || canvas.offsetParent === null) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Distruggi il grafico esistente se c'è
            if (this.chartViews) {
                this.chartViews.destroy();
                this.chartViews = null;
            }

            this.chartViews = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.projectsByMonths.map(v => `${v.month}/${v.year}`),
                    datasets: [{
                        label: 'Visite per mese',
                        data: this.projectsByMonths.map(v => v.view_count),
                        backgroundColor: [
                            'dodgerblue',
                        ],
                        borderColor: 'dodgerblue',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true }
                    },
                    // aspectRatio: 2,
                    cutout: '60%',
                    // animation: {
                        // duration: 1000, // Durata dell'animazione
                        // easing: 'linear', // Easing predefinito (puoi provarne diversi)
                    // },
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    resizeDelay: 500
                }
            });

        },
        handleResize() {
            if (this.resizeTimeout) clearTimeout(this.resizeTimeout);

            this.resizeTimeout = setTimeout(() => {
                // Verifica se il canvas esiste prima di distruggere il grafico
                const projectsCanvas = document.getElementById('projectsChart');
                const viewsCanvas = document.getElementById('viewChart');

                if (this.chartProjects && projectsCanvas) {
                    this.chartProjects.destroy();
                    this.chartProjects = null;
                }

                if (this.chartViews && viewsCanvas) {
                    this.chartViews.destroy();
                    this.chartViews = null;
                }

                this.$nextTick(() => {
                    if (projectsCanvas) this.renderProjectsChart();
                    if (viewsCanvas) this.renderViewsChart();
                });

            }, 500);

            // if (this.resizeTimeout) clearTimeout(this.resizeTimeout);

            // this.resizeTimeout = setTimeout(() => {
            //     if (this.chartProjects) this.chartProjects.update();
            //     if (this.chartViews) this.chartViews.update();
            // }, 500);
        }

    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        if (this.chartProjects){
            this.chartProjects.destroy()
        }

        if(this.chartViews){
            this.chartViews.destroy()
        }
    },
    mounted() {
        axios
        .get("/api/user")
        .then((response) => {

            this.name = response.data.name

            Promise.all([
                this.loadProjects(),
                this.loadTypes(),
                this.loadTechs(),
                this.loadViews(),
                this.loadProjectsPerType(),
                this.loadProjectsViews()
            ]).then(() => {
                this.$nextTick(() => {
                    this.renderProjectsChart();
                    this.renderViewsChart();
                    window.addEventListener('resize', this.handleResize);
                });
            });

            setTimeout(() => {
                this.isLoading = false;
                this.$nextTick(() => {
                    this.renderProjectsChart();
                    this.renderViewsChart();
                });
            }, 2500)
        })
        .catch((error) =>{
            if(error.response.status === 401){
                localStorage.removeItem('authenticated');
                this.$router.push({ name: 'Login'})
            }

        })
    },
}
</script>

<template>
    <HeaderDashboard/>

    <div class="wrap-container">
        <Sidenav/>
        <div class="container-body">
            <div class="container-fluid p-4" v-if="!isLoading">
                <div class="row py-2">

                    <div class="col-12">
                        <div class="card-dashboard">
                            <div class="title-list">
                                <h2>Ciao, {{ name }}</h2>
                                <p>Riepilogo delle attività</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="box-stat">

                    <div class="row py-2">

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="projects">
                                    <i class="bi bi-archive"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Progetti</h5>
                                    <span>{{ projects.length }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="type">
                                    <i class="bi bi-tags"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Tipi</h5>
                                    <span>{{ types.length }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-sm-12 col-md-4">
                            <div class="card-dashboard">
                                <div class="circle" id="gear">
                                    <i class="bi bi-gear"></i>
                                </div>
                                <div class="text-box">
                                    <h5>Tecnologie</h5>
                                    <span>{{ techs.length }}</span>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="row py-2">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-7">
                            <div class="card-stats">
                                <div class=" d-flex gap-2 justify-content-between">
                                    <h5>Visite mensili</h5>
                                    <div class="views-total">
                                        <i class="bi bi-eye"></i>
                                        <span>{{ totalViews }}</span>
                                    </div>
                                </div>

                                <!-- se il grafico delle visite è visibile -->
                                <canvas id="viewChart" v-if="!isNull"></canvas>

                                <!-- se non è visibile -->
                                <div class="d-flex justify-content-center align-items-center flex-column" v-else>
                                    <i class="bi bi-bar-chart-line-fill"></i>
                                    <span>Nessun grafico disponibile</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-12 col-md-12 col-lg-5">
                            <div class="card-stats">
                                <h5>Progetti per tipi</h5>

                                <!-- se il grafico delle visite è visibile -->
                                <canvas id="projectsChart" v-if="!isNull"></canvas>

                                <!-- se non è visibile -->
                                <div class="d-flex justify-content-center align-items-center flex-column" v-else>
                                    <i class="bi bi-pie-chart-fill"></i>
                                    <span>Nessun grafico disponibile</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="container-fluid" v-else>
                <Loader/>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../scss/general' as *;
@use '../../scss/variables' as *;

*{
    color: $color-text;
}

.circle{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    height: 4.5rem;
    width: 4.5rem;

    .bi{
        font-size: 2.2rem;
    }

    .bi-archive{
        color: tomato;
    }

    .bi-tags{
        color: rgb(213, 67, 199);
    }

    .bi-gear{
        color: rgb(71, 111, 255);
    }
}

#projects{
    background-color: rgb(255, 223, 223);
}

#type{
    background-color: rgb(254, 217, 250);
}

#gear{
    background-color: rgb(219, 227, 255);
}

.card-stats{
    padding: 2rem;
    background-color: $color-light;
    // height: 600px;
    border-radius: 15px;
}

.views-total{
    display: flex;
    gap: 0.6rem;
}

canvas{
    padding-top: 1rem;
    max-height: 500px;
    max-width: 750px;
    display: block;
}

.bi-bar-chart-line-fill,
.bi-pie-chart-fill{
    color: $shadow;
    font-size: 4rem;
}


</style>
