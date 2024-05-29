import { COLORS, FONT_SIZE } from "../../constants/theme.js";

export const styles = {
    despesa: {
        width: "100%",
        backgroundColor: COLORS.gray,
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    despesaIcon: {
        width: 35,
        height: 35,
    },

    containerIcon: {
        flex: 3,
    },

    containerCategoria: {
        flex: 10,
    },

    containerValor: {
        flex: 4,
    },

    despesaCategoria: {
        fonteSize: FONT_SIZE.sm,
        color: COLORS.dark_gray,
        fontWeight: "bold"
    },

    despesaDescricao: {
        fonteSize: FONT_SIZE.sm,
        color: COLORS.dark_gray,
    },

    despesaValor: {
        fonteSize: FONT_SIZE.sm,
        color: COLORS.dark_gray,
        fontWeight: "bold",
        textAlign: "right",
    },


}