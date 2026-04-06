import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MyColor from "../utils/MyColor"
import ButtonType from "../enums/ButtonType"
import MySpiner from "./MySpiner"

type Props = {
    type: ButtonType,
    label: string,
    Icon?: React.ComponentType<any>,
    loading?: boolean,
    onPress?: () => void
}


const MyButton = ({ type, label, Icon, loading, onPress }: Props) => {

    const Possitive = () => {
        return (
            <TouchableOpacity
                style={[
                    styles.background,
                    { backgroundColor: MyColor.ForestGreen }
                ]}
                onPress={onPress}
                disabled={loading}>
                {loading && <MySpiner color="white" />}
                {!loading && Icon && <Icon width={20} height={20} fill="white" />}
                <Text
                    style={[
                        styles.label,
                        { color: "white" }]
                    }>
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

    const Negative = () => {
        return (
            <TouchableOpacity
                style={[
                    styles.background,
                    { backgroundColor: MyColor.Honeydew }
                ]} >
                {Icon && <Icon width={20} height={20} fill={MyColor.ForestGreen} />}
                <Text
                    style={[
                        styles.label,
                        { color: MyColor.ForestGreen }
                    ]}>
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

    const Disable = () => {
        return (
            <View
                style={[
                    styles.background,
                    { backgroundColor: MyColor.Platinum }
                ]} >
                {Icon && <Icon width={20} height={20} fill={MyColor.PlatinumMedium} />}
                <Text
                    style={[
                        styles.label,
                        { color: MyColor.PlatinumMedium }
                    ]}>
                    {label}
                </Text>
            </View>
        )
    }

    const Delete = () => {
        return (
            <TouchableOpacity
                style={[
                    styles.background,
                    { backgroundColor: MyColor.RedPastel }
                ]}>
                {Icon && <Icon width={20} height={20} fill={MyColor.ChiliRed} />}
                <Text
                    style={[
                        styles.label,
                        { color: MyColor.ChiliRed }
                    ]}>
                    {label}
                </Text>
            </TouchableOpacity>
        )
    }

    if (type === ButtonType.Possitive)
        return (<Possitive />)
    else if (type === ButtonType.Negative)
        return (<Negative />)
    else if (type === ButtonType.Disable)
        return (<Disable />)
    else if (type === ButtonType.Delete)
        return (<Delete />)
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        fontWeight: 600
    },
    background:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 12,
        gap: 8

    }
})

export default MyButton