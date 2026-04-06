import { Text, View } from "react-native"
import MyButton from "../components/MyButton"
import ButtonType from "../enums/ButtonType"
import MyIcons from "../utils/MyIcon"
import { SafeAreaView } from "react-native-safe-area-context"
import MySearchBar from "../components/MySearchBar"

const Home = () => {
    return (
        <SafeAreaView style={{ padding: 10, gap: 10}} >
            <MySearchBar placeholder="Tra từ" />
            <Text>Home</Text>
            <MyButton type={ButtonType.Negative} label="Negative" Icon={MyIcons.Trash}/>
            <MyButton type={ButtonType.Possitive} label="Possitive" Icon={MyIcons.Plus} loading={true} onPress={()=>console.log("Đã nhấn")}/>
            <MyButton type={ButtonType.Disable} label="Disable" Icon={MyIcons.Home} />
            <MyButton type={ButtonType.Delete} label="Delete" Icon={MyIcons.Trash} />
        </SafeAreaView>
    )
}
export default Home