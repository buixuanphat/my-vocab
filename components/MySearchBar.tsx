import { StyleSheet, TextInput, View } from "react-native"
import MyIcons from "../utils/MyIcon"
import MyColor from "../utils/MyColor"

type Props = {
    placeholder: string
}

const MySearchBar = ({ placeholder }: Props) => {
    return (
        <View
            style={styles.background}
        >
            <MyIcons.Search width={24} height={24} fill="grey" />
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor="grey"
                returnKeyType="search"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background:
    {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 100
    },
    textInput:
    {
        flex: 1,
        fontSize: 18
    }
})

export default MySearchBar