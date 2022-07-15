import { useNavigation } from "@react-navigation/native";
import React,{useState,useEffect} from "react";
import { Controller, useForm } from "react-hook-form";
import { View,Text,Image,StyleSheet,StatusBar,Animated,FlatList,TouchableOpacity } from "react-native";
import R from "../../../assets/R";
import { FORGOTPASSNEWPASS, LOGINSCREEN, TABNAVIGATOR } from "../../../routers/ScreenNames";
import TextForm from "../../../components/Input/InputForm";
import Button from "../../../components/Button";
import Entypo from "react-native-vector-icons/Entypo"
import Header from "../../../components/Header/Header";


const ForgotPassOtp = (props) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const navigate = useNavigation();
    
      const onSubmit = (data) => {
        navigate.navigate(FORGOTPASSNEWPASS);
        console.log(data);
      };
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <Header
                isBack={true}
            />
            <View 
                style={{
                    flex:1,
                    backgroundColor:R.colors.white,
                    width:R.sizes.width,
                    height:R.sizes.height
                }}
            >
                
                <View
                    style={{
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <Text style={styles.txtSignIn}>Forgot{"\n"}Password</Text>
                    <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                        <Text style={styles.title}>An OTP code snet your phone. Enter it here</Text>
                        <TextForm
                        textColor={R.colors.black}
                        placeholder={'Enter OTP code'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.otpcode}
                        containerStyle ={{
                            width:320,
                            borderWidth:0.1,
                            height:50,
                            borderRadius:15,shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                        }}
                        
                        />
                        </>
                    )}
                    name="otpcode"
                    defaultValue=""
                    />

                    <View
                        style={{
                        }}
                    >
                        <Button
                            title={'Next'}
                            backgroundColor={R.colors.colorMain}
                            containerStyle={{
                                height:50,
                                width:320,
                                borderRadius:15,
                            }}
                            txtStyle={{
                                color:'#fff',
                                fontWeight:'700'
                            }}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    ic:{
        padding:5
    },
    imgSalad:{
        width:250,
        height:250,
        position:'absolute',
        left:"-20%",
        bottom:"-40%"
    },
    line:{
        height:1,
        width:'61%',
        backgroundColor:'#ccc',
        marginRight:10
    },
    txtConnect:{
        color:R.colors.color777,
        fontSize:14
    },
    txtSignIn:{
        fontSize:32,
        color:R.colors.black,
        fontWeight:'500',
        alignSelf:'flex-start',
        paddingHorizontal:20,
        marginTop:50,
    },
    title:{
        alignSelf:'flex-start',
        paddingHorizontal:20,
        paddingVertical:20,
        color:R.colors.color777,
        fontSize:14
    }
})

export default ForgotPassOtp;