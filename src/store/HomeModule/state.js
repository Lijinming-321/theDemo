import Actions from "@/store/HomeModule/actions.js";
import Mutations from "@/store/HomeModule/mutations.js";
export default {
    namespaced: true,
    state: {
        showPage: false
    },
    mutations: Mutations,
    actions: Actions
}