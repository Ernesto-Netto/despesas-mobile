import { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./cad-despesa.style.js"
import icons from "../../constants/icons.js";
import { Picker } from '@react-native-picker/picker';
import api from "../../services/api.js"

//function CadDespesa(props) {

const CadDespesa = (props) => {

    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [forma, setForma] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");

    const handleSalvar = async () => {
        //Salvar a despesa na API
        try {
            if (props.route.params.id > 0) {
                await api.put("/despesa/" + props.route.params.id, {
                    descricao: descricao,
                    categoria: categoria,
                    valor: valor,
                    forma: forma,
                    mes: mes,
                    ano: ano
                });
            } else {
                await api.post("/despesa", {
                    descricao: descricao,
                    categoria: categoria,
                    valor: valor,
                    forma: forma,
                    mes: mes,
                    ano: ano
                });
            }
            props.navigation.navigate("home");
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao salvar dados");
        }
    }

    const handleExcluir = async () => {
        //Exclui a despesa na API
        try {
            await api.delete("/despesas/" + props.route.params.id);
            props.navigation.navigate("home");
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao excluir os dados");
        }
    }

    const DadosDespesa = async (id) => {
        try {
            //Buscar Dados na API
            const response = await api.get("/despesas/" + id);
            setDescricao(response.data.descricao);
            setCategoria(response.data.categoria);
            setValor(response.data.valor);

        } catch (error) {
            console.log(error)
            Alert.alert("Erro ao buscar dados da despesa");
        }
    };

    useEffect(() => {
        //Tratar o texto header...
        props.navigation.setOptions({
            title: props.route.params.id > 0 ? "Editar Despesa" : "Nova Despesa"
        });

        //Buscar os dados da despesa na API...
        if (props.route.params.id > 0) {
            DadosDespesa(props.route.id);
        }
    }, []);

    return <View style={styles.container}>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Valor</Text>
            <TextInput placeholder="0,00" style={styles.inputValor}
                defaultValue={valor}
                keyboardType="decimal-pad"
                onChangeText={(texto) => setValor(texto)} />
        </View>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput placeholder="Ex: Aluguel"
                style={styles.inputText}
                defaultValue={descricao}
                onChangeText={(texto) => setDescricao(texto)} />
        </View>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Categoria</Text>
            <View style={styles.inputPiker}>
                <Picker selectedValue={categoria}
                    onValueChange={(itemValue, itemIndex) => {
                        setCategoria(itemValue);
                    }}>
                    <Picker.Item label="Carro" value="Carro" />
                    <Picker.Item label="Casa" value="Casa" />
                    <Picker.Item label="Lazer" value="Lazer" />
                    <Picker.Item label="Mercado" value="Mercado" itemStyle={{ padding: 0 }} />
                    <Picker.Item label="Educação" value="Educação" />
                    <Picker.Item label="Viagem" value="Viagem" />
                </Picker>
            </View>
        </View>




        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Forma de Pagmento</Text>
            <View style={styles.inputPiker}>
                <Picker selectedValue={forma}
                    onValueChange={(itemValue, itemIndex) => {
                        setForma(itemValue);
                    }}>
                    <Picker.Item label="Crédito" value="Crédito" />
                    <Picker.Item label="Débito" value="Débito" />
                </Picker>
            </View>
        </View>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Mês</Text>
            <View style={styles.inputPiker}>
                <Picker selectedValue={mes}
                    onValueChange={(itemValue, itemIndex) => {
                        setMes(itemValue);
                    }}>
                    <Picker.Item label="Janeiro" value="Janeiro" />
                    <Picker.Item label="Fevereiro" value="Fevereiro" />
                    <Picker.Item label="Março" value="Março" />
                    <Picker.Item label="Abril" value="Abril" />
                    <Picker.Item label="Maio" value="Maio" />
                    <Picker.Item label="Junho" value="Junho" />
                </Picker>
            </View>
        </View>

        <View style={styles.containerField}>
            <Text style={styles.inputLabel}>Ano</Text>
            <View style={styles.inputPiker}>
                <Picker selectedValue={ano}
                    onValueChange={(itemValue, itemIndex) => {
                        setAno(itemValue);
                    }}>
                    <Picker.Item label="2023" value="2023" />
                    <Picker.Item label="2024" value="2024" />
                    <Picker.Item label="2025" value="2025" />
                </Picker>
            </View>
        </View>





        <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.containerDelete}>
            <TouchableOpacity onPress={handleExcluir}>
                <Image source={icons.remove} style={styles.btnDelete} />
            </TouchableOpacity>
        </View>

    </View >
}

export default CadDespesa;