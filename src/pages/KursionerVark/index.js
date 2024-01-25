import { View, Text, Image, TouchableNativeFeedback, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { MyButton, MyRadio } from '../../components'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import { apiURL, getData, storeData } from '../../utils/localStorage'

export default function KursionerVark({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [VARK, setVARK] = useState({
        V: 0,
        A: 0,
        R: 0,
        K: 0,
    });
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.post(apiURL + 'kuis').then(res => {
            console.log(res.data);
            setData(res.data);
            setOpen(true);
        });

        getData('user').then(uu => {
            console.log(uu);
            setUser(uu);
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>

                {/* JUDUL KUERSIONAL VARK */}
                <View style={{ flexDirection: 'row', padding: 10 }}>


                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 2
                    }}>
                        Kuesioner {'\n'}
                        VARK
                    </Text>

                    <View>
                        <TouchableNativeFeedback>
                            <View style={{
                                padding: 10,
                            }}>
                                <Image source={require('../../assets/backright.png')} style={{
                                    width: 40,
                                    height: 40,
                                }} />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                {/* END HEADER */}

                {/* CONTENT SOAL */}
                <View style={{ padding: 10 }}>

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 2.5,
                        textAlign: 'left'
                    }}>
                        Bagaimana cara belajar yang terbaik bagi saya?
                    </Text>
                    <Text style={{
                        marginBottom: 10,
                        fontFamily: fonts.secondary[400],
                        fontSize: MyDimensi / 3.2,
                        textAlign: 'justify'
                    }}>
                        Pilihlah jawaban yang paling sesuai dengan kondisi anda. Anda boleh memilih lebih dari satu pilihan jika memang ada lebih dari kondisi yang sesuai. Kosongkan saja pilihan yang tidak sesuai dengan anda
                    </Text>


                    {/* JAWABAN & SOAL */}

                    {data.length > 0 && open &&

                        <FlatList data={data} renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    marginVertical: 5,
                                    borderBottomColor: colors.border,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[800],
                                        fontSize: MyDimensi / 4,
                                        marginBottom: 5,
                                        marginLeft: 10,
                                    }}>
                                        {item.soal}
                                    </Text>
                                    <View>

                                        <TouchableWithoutFeedback onPress={() => {
                                            let tmp = [...data];
                                            if (tmp[index][1] == 1) {
                                                tmp[index][1] = 0;
                                                let char = tmp[index][11];
                                                setVARK({
                                                    ...VARK,
                                                    [char]: VARK[char] - 1
                                                })
                                            } else if (tmp[index][1] == 0) {
                                                tmp[index][1] = 1;
                                                let char = tmp[index][11];
                                                setVARK({
                                                    ...VARK,
                                                    [char]: VARK[char] + 1
                                                })
                                            }
                                            setData(tmp)


                                        }}>
                                            <View style={styles.kuis}>
                                                <View style={{
                                                    paddingHorizontal: 5,
                                                }}>
                                                    <Icon type='ionicon' name={item[1] > 0 ? 'checkbox' : 'checkbox-outline'} color={colors.primary} size={MyDimensi / 2} />
                                                </View>
                                                <Text style={{
                                                    flex: 1,
                                                    fontFamily: fonts.secondary[600],
                                                    fontSize: MyDimensi / 4
                                                }}>{item.a}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <TouchableWithoutFeedback onPress={() => {
                                            let tmp = [...data];
                                            if (tmp[index][2] == 1) {
                                                tmp[index][2] = 0;
                                                let char = tmp[index][22];
                                                setVARK({
                                                    ...VARK,
                                                    [char]: VARK[char] - 1
                                                })
                                            } else if (tmp[index][2] == 0) {
                                                tmp[index][2] = 1;
                                                let char = tmp[index][22];
                                                setVARK({
                                                    ...VARK,
                                                    [char]: VARK[char] + 1
                                                })
                                            }
                                            setData(tmp)
                                        }}>
                                            <View style={styles.kuis}>
                                                <View style={{
                                                    paddingHorizontal: 5,
                                                }}>
                                                    <Icon type='ionicon' name={item[2] > 0 ? 'checkbox' : 'checkbox-outline'} color={colors.primary} size={MyDimensi / 2} />
                                                </View>
                                                <Text style={{
                                                    flex: 1,
                                                    fontFamily: fonts.secondary[600],
                                                    fontSize: MyDimensi / 4
                                                }}>{item.b}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <TouchableWithoutFeedback onPress={() => {
                                            let tmp = [...data];
                                            if (tmp[index][3] == 1) {
                                                tmp[index][3] = 0;
                                                let char = tmp[index][33];
                                                setVARK({
                                                    ...VARK,
                                                    [char]: VARK[char] - 1
                                                })
                                            } else if (tmp[index][3] == 0) {
                                                tmp[index][3] = 1;
                                                let char = tmp[index][33];
                                                setVARK({
                                                    ...VARK,
                                                    [char]: VARK[char] + 1
                                                })
                                            }
                                            setData(tmp)
                                        }}>
                                            <View style={styles.kuis}>
                                                <View style={{
                                                    paddingHorizontal: 5,
                                                }}>
                                                    <Icon type='ionicon' name={item[3] > 0 ? 'checkbox' : 'checkbox-outline'} color={colors.primary} size={MyDimensi / 2} />
                                                </View>
                                                <Text style={{
                                                    flex: 1,
                                                    fontFamily: fonts.secondary[600],
                                                    fontSize: MyDimensi / 4
                                                }}>{item.c}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <TouchableWithoutFeedback onPress={() => {
                                            let tmp = [...data];
                                            if (tmp[index][4] == 1) {
                                                tmp[index][4] = 0;
                                                let char = tmp[index][44];
                                                setVARK({
                                                    ...VARK,
                                                    [char]: VARK[char] - 1
                                                })
                                            } else if (tmp[index][4] == 0) {
                                                tmp[index][4] = 1;
                                                let char = tmp[index][44];
                                                setVARK({
                                                    ...VARK,
                                                    [char]: VARK[char] + 1
                                                })
                                            }
                                            setData(tmp)
                                        }}>
                                            <View style={styles.kuis}>
                                                <View style={{
                                                    paddingHorizontal: 5,
                                                }}>
                                                    <Icon type='ionicon' name={item[4] > 0 ? 'checkbox' : 'checkbox-outline'} color={colors.primary} size={MyDimensi / 2} />
                                                </View>
                                                <Text style={{
                                                    flex: 1,
                                                    fontFamily: fonts.secondary[600],
                                                    fontSize: MyDimensi / 4
                                                }}>{item.d}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                    </View>
                                </View>
                            )
                        }} />
                    }


                    <View style={{
                        marginTop: 10,
                    }}>
                        <MyButton onPress={() => {
                            let kirim = data.map(v => {
                                delete v.soal;
                                delete v.a;
                                delete v.b;
                                delete v.c;
                                delete v.d;
                                return v;
                            });
                            setLoading(true);
                            axios.post(apiURL + 'update_vark', {
                                ...VARK,
                                ...user
                            }).then(res => {
                                console.log(res.data.data);
                                storeData('user', res.data.data);
                                setLoading(false);
                                navigation.navigate('MainApp')
                            }).finally(() => {

                            })

                        }} title="OK" Icons="checkmark" />
                        {loading && <View style={{
                            padding: 10,
                        }}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    kuis: {
        marginVertical: 2,
        borderColor: colors.border,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    }
})