<script>
export default {
    name: "CustomButton",
    props: {
        type: {
            type: String,
            default: 'button'
        },
        variant: {
            type: String,
            default: 'primary' // 'primary', 'secondary', 'outline'
        },
        icon: {
            type: String,
            default: '' // Ruta del ícono SVG (opcional)
        },
    },
    computed: {
        buttonStyles() {
            switch (this.variant) {
                case 'primary':
                    return 'bg-orangeBright text-white hover:bg-orangeLight focus:ring-orangeRed';
                case 'secondary':
                return 'text-orangeBright hover:bg-orangeBright hover:text-white focus:ring-orangePale focus:ring-opacity-50';
                case 'outline':
                return 'border-2 border-orangeBright text-orangeBright hover:bg-orangeBright hover:text-white focus:ring-orangePale focus:ring-opacity-50';
                default:
                    return 'bg-orangeBright text-white hover:bg-orangeLight focus:ring-orangeRed';
            }
        }
    }
}
</script>

<style scoped>
/* Puedes añadir más estilos aquí si es necesario */
</style>


<template>
    <button v-bind="$attrs"  :class="[
        'w-full py-3 px-4 font-poppins-medium rounded-lg  focus:outline-none focus:ring-2 focus:ring-offset-2',
        buttonStyles
    ]" :type="type">
        <div class="flex justify-center items-center space-x-2">
            <!-- Si se pasa una ruta de icono, mostramos el ícono con <img> -->
            <img v-if="icon" :src="icon" alt="icon" class="w-5 h-5" />
            <!-- El texto del botón -->
            <slot></slot>
        </div>
    </button>
</template>
