import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreDataInStorage = (key: string, value: string) => {
    storeData(key, value)
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        console.warn(err)
    })
}

export const storeData = async (key: string, value: string) =>{
    try{
        await AsyncStorage.setItem(`@${key}`, JSON.stringify(value))
    }
    catch(e){
        console.warn(e)
    }
}

export const GetDataFromStorage = (key: string) => {
    getData(key)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.warn(err)
    })

}

export const getData = async (key: string) =>{
    try{
        const value = await AsyncStorage.getItem(`@${key}`)
        return value != null ? JSON.parse(value) : '' 
        
    }catch(e){
        console.warn(e)
    }
}

