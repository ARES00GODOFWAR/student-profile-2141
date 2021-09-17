<template>
    <div class="wrapper">

        <b-container class="bv-example-row">
            <input class="search p-3" type="text" placeholder="Search name" v-model="search">
            <input class="search p-3" type="text" placeholder="Search tag" v-model="searchTags">

            <b-row v-for="student in filteredStudents" :key="student.id">
                <div class="">
                    <b-card no-body class="overflow-hidden" style="max-width: 900px; margin-left: 10em; ">
                        <b-row>
                            <b-col md="4" style="padding: 40px">
                                <b-card-img
                                    style="width: 150px; border: 1px solid black; border-radius:100px !important"
                                    :src="student.pic" alt="Image" class="rounded-0">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body>
                                    <b-card-text style="text-align: left">
                                        <h1>{{student.firstName}} {{student.lastName}}</h1>
                                        <p>Email: {{student.email}}</p>
                                        <p>Company: {{student.company}}</p>
                                        <p>Skill: {{student.skill}}</p>
                                        <p>Average: {{average(student.grades)}}%</p>

                                    </b-card-text>
                                    <b-card-text :class="gradesActive ? 'show-elm' : 'hide-elm'"
                                        style="text-align: left">
                                        <p v-for="(grades,index) in student.grades" :key="index">Grade {{index + 1}}:
                                            {{grades}}</p>

                                        <vue-tags-input v-model="tag" :tags="tags"
                                            @tags-changed="newTags => tags = newTags" />
                                    </b-card-text>
                                </b-card-body>
                            </b-col>
                            <b-col>
                                <div :id="student.id" 
                                :class="gradesActive ? 'hide-elm icon-clicker' : 'show-elm icon-clicker'"
                                style="padding-top: 20px">
                                    <svg @click="iconClick(student, student.id)" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                        class="feather feather-plus">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </div>
                                <div :id="student.id"
                                    :class="gradesActive ? 'show-elm icon-clicker' : 'hide-elm icon-clicker'"
                                    style="padding-top: 20px">
                                    <svg @click="iconClick(student, student.id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </div>

                            </b-col>
                        </b-row>
                    </b-card>
                </div>

            </b-row>
        </b-container>
    </div>
</template>

<script>
    import VueTagsInput from '@johmun/vue-tags-input';

    export default {

        data() {
            return {
                search: "",
                gradesActive: false,
                searchTags: "",
                tag: '',
                tags: [],
            }
        },
        components: {
            VueTagsInput
        },
        methods: {

            average(arr) {
                let ans = 0;
                let length = arr.length;

                for (let i = 0; i < length; i++) {
                    ans = ans + parseInt(arr[i]);
                }

                return (ans / length).toFixed(3);
            },
            iconClick(student, id) {
                if (student.id == id) {
                    this.gradesActive = !this.gradesActive
                }
            },

        },
        computed: {
            students() {
                return this.$store.getters["home/getStudents"]
            },
            filteredStudents() {
                return this.students.filter((student) => {
                    return student.firstName.toLowerCase().includes(this.search.toLowerCase()) || student
                        .lastName.toLowerCase().includes(this.search.toLowerCase())
                    // match(this.search)
                })
            },
            // filteredTags() {
            //     return this.tags.filter((tag) => {
            //         return tag.toLowerCase().includes(this.search.toLowerCase()) || tag.toLowerCase().includes(
            //             this.searchTags.toLowerCase())
            //         // match(this.search)
            //     })
            // }



        },
        async mounted() {
            await this.$store.dispatch("home/loadStudents")
        },

    }
</script>

<style>

    .wrapper {
        background-color: #efefef;
        padding: 50px;
        margin: 0%;
    }

    .students_container {
        border: 1px solid black;
    }

    .icon-clicker {
        margin: 10px;
        grid-column: 3;
        grid-row: 1;
    }

    .show-elm {
        display: block;
    }

    .search {
        width: 69% !important;
        border: none !important;
        border-bottom: 1px solid black !important;
        margin-bottom: 10px;
        margin-left: -75px;
    }

    .hide-elm {
        display: none;
    }
</style>