/* eslint-disable @typescript-eslint/no-explicit-any */
export const useNotifications = () => {

    const toast = useToast()

    const constructErrorMessage = (error:any )=>{
        let errorMessage: string = '' + error.value
        if (error.value && error.value.data) {
            errorMessage = `${error.value.data.error} - ${error.value.data.errorMessage}`
        }else if (error.data){
            errorMessage = `${error.data.error} - ${error.data.errorMessage}`
        }else if(error.message){
            errorMessage = error.message
        }
        return errorMessage;
    }

    

    return {
        createErrorNotification (error:any, title?:string) {
            toast.add({
                color:"error",
                icon:'i-icon-park-outline-error-computer',
                title:title?title:'Error on processing your request.',
                description: constructErrorMessage(error)
            })
        },
        createSuccessNotification (title?:string, description?:string) {
            toast.add({
                color:"primary",
                icon:'i-icon-park-outline-database-success',
                title:title?title:'Success!',
                description: description?description:'Saving record was successful.'
            })
        },

        createDeleteNotification (title?:string, description?:string) {
            toast.add({
                color:"warning",
                icon:'i-heroicons-archive-box-20-solid',
                title:title?title:'Success!',
                description: description?description:'Record was archived successfully.'
            })
        },

        createNotification (title:string, description:string, icon?:string, color?:"error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral") {
            toast.add({
                color:color?color:"primary",
                icon:icon?icon:'i-icon-park-outline-database-success',
                title:title?title:'Success!',
                description: description?description:'Saving record(s) was successful.'
            })
        }

    }
}