import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import { MYAPP, apiURL, getData, webURL } from '../../utils/localStorage';
import { MyDimensi, colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';
import CountDown from 'react-native-countdown-component';
import SoundPlayer from 'react-native-sound-player';
import SweetAlert from 'react-native-sweet-alert';
export default function InfoSoal({ navigation, route }) {

    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [ragu, setRagu] = useState([])
    const [betul, setBetul] = useState([]);
    const [user, setUser] = useState({});
    const [nomor, setNomor] = useState(0);
    const [open, setOpen] = useState(false);
    const [pilih, setPilih] = useState([]);
    const [skor, setSkor] = useState([]);
    const [sudah, setSudah] = useState([])

    const [soal, setSoal] = useState([])
    useEffect(() => {
        __getTransaction();
    }, []);

    const __getTransaction = () => {
        console.log(route.params.kategori)

        getData('user').then(u => {
            setUser(u)
        })
        axios.post(apiURL + 'soal', {
            kategori: route.params.kategori
        }).then(res => {

            console.log(res.data);

            if (res.data.length > 0) {
                res.data.map(i => {
                    sudah.push(0);
                    soal.push(0);
                    skor.push(0);
                    ragu.push(false);
                    betul.push(false);
                    pilih.push(
                        {
                            a: false,
                            b: false,
                            c: false,
                            d: false,
                            e: false
                        }
                    )
                })

                setData(res.data);
                setTimeout(() => {
                    setOpen(true);
                }, 200)

            } else {
                Alert.alert(MYAPP, 'Soal Belum Ada !');

            }



        })
    }
    const sendServer = () => {
        SoundPlayer.stop();

        let totalNilai = skor.reduce((a, b) => a + b, 0);


        let nilai = (totalNilai / data.length) * 100;

        const kirim = {
            nilai: nilai,
            fid_user: user.id,
            kategori: route.params.nama_materi
        }

        axios.post(apiURL + 'nilai_add', kirim).then(res => {
            console.log(res.data);

            SweetAlert.showAlertWithOptions({
                title: 'Terima kasih sudah mengerjakan soal ' + route.params.kategori,
                subTitle: `Nilai kamu adalah : ${nilai}`,
                style: 'success',
                cancellable: true
            },
                callback => navigation.goBack());
        });








    }
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View style={{
                flex: 1,
                // justifyContent: 'center',

                padding: 10,
                backgroundColor: colors.white
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 2,
                    textAlign: 'center',
                }}>{route.params.kategori}</Text>
                <View style={{
                    marginBottom: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                        textAlign: 'center',
                        color: colors.white
                    }}>{route.params.nama_materi}</Text>


                </View>
                {open &&
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{
                            flex: 1,
                            borderRadius: 10,
                            backgroundColor: colors.white,
                            padding: 10,
                        }}>
                            {/* SOAL */}
                            <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, left: 5, color: colors.primary }}>JUMLAH SOAL ADA {data.length}</Text>
                            <View style={{
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderBottomColor: colors.secondary
                            }}>

                                <Text style={{ flex: 1, fontFamily: fonts.secondary[600], fontSize: 15, color: colors.primary }}> SOAL NOMOR <Text style={{ backgroundColor: colors.primary, color: colors.white, }}>  {nomor + 1}  </Text></Text>


                            </View>

                            <View style={{
                                padding: 20,
                            }}>

                                {data[nomor].suara.length > 0 &&
                                    <TouchableOpacity onPress={() => {
                                        try {
                                            try {

                                                SoundPlayer.playUrl(webURL + data[nomor].suara)
                                            } catch (e) {
                                                console.log(`cannot play the sound file`, e)
                                            }
                                        } catch (error) {

                                        }
                                    }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 10,
                                        backgroundColor: colors.primary,
                                        borderRadius: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.white,
                                            fontSize: MyDimensi / 4
                                        }}>Putar Soal Audio</Text>
                                    </TouchableOpacity>
                                }


                                <RenderHtml

                                    source={{
                                        html: data[nomor].soal
                                    }}
                                />



                                <TouchableOpacity

                                    onPress={() => {



                                        if (!pilih[nomor].a) {
                                            pilih[nomor] = { b: false, c: false, d: false, a: true, e: false };
                                            setPilih([...pilih])

                                            if (data[nomor].jawaban == 'A' && !betul[nomor]) {

                                                betul[nomor] = true;
                                                setBetul([...betul])

                                                skor[nomor] = 1;
                                            } else if (data[nomor].jawaban == 'A' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[nomor] - 1;
                                            } else if (data[nomor].jawaban !== 'A' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[nomor] - 1;
                                            }
                                        } else {
                                            pilih[nomor] = { ...pilih[nomor], a: false };
                                            setPilih([...pilih])
                                            if (data[nomor].jawaban == 'A' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[0] - 1;
                                            }

                                        }

                                    }}

                                    style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                                    <Text style={{ fontFamily: fonts.secondary[600], fontSize: 14, color: colors.black }}>A. </Text>
                                    {pilih[nomor].a &&

                                        <View style={{ position: 'absolute', left: -3, top: -5 }}><Icon type='ionicon' color={colors.secondary} name='checkmark-outline' /></View>}



                                    <RenderHtml
                                        contentWidth={'100%'}
                                        source={{
                                            html: data[nomor].a
                                        }}
                                    />


                                </TouchableOpacity>

                                <TouchableOpacity

                                    onPress={() => {

                                        if (!pilih[nomor].b) {
                                            pilih[nomor] = { a: false, c: false, d: false, b: true, e: false };
                                            setPilih([...pilih])
                                            if (data[nomor].jawaban == 'B' && !betul[nomor]) {
                                                betul[nomor] = true;
                                                setBetul([...betul])

                                                skor[nomor] = 1;
                                            } else if (data[nomor].jawaban == 'B' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[nomor] - 1;
                                            } else if (data[nomor].jawaban !== 'B' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[nomor] - 1;
                                            }
                                        } else {
                                            pilih[nomor] = { ...pilih[nomor], b: false };
                                            setPilih([...pilih])
                                            if (data[nomor].jawaban == 'B' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[0] - 1;
                                            }

                                        }

                                    }}

                                    style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                                    <Text style={{ fontFamily: fonts.secondary[600], color: colors.black, fontSize: 14 }}>B. </Text>
                                    {pilih[nomor].b && <View style={{ position: 'absolute', left: -3, top: -5 }}><Icon type='ionicon' color={colors.secondary} name='checkmark-outline' /></View>}
                                    <RenderHtml
                                        contentWidth={'100%'}
                                        source={{
                                            html: data[nomor].b
                                        }}
                                    />

                                </TouchableOpacity>

                                <TouchableOpacity

                                    onPress={() => {

                                        if (!pilih[nomor].c) {
                                            pilih[nomor] = { b: false, a: false, d: false, c: true, e: false };
                                            setPilih([...pilih])
                                            if (data[nomor].jawaban == 'C' && !betul[nomor]) {
                                                betul[nomor] = true;
                                                setBetul([...betul])
                                                skor[nomor] = 1;
                                            } else if (data[nomor].jawaban == 'C' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[nomor] - 1;
                                            } else if (data[nomor].jawaban !== 'C' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[nomor] - 1;
                                            }
                                        } else {
                                            pilih[nomor] = { ...pilih[nomor], c: false };
                                            setPilih([...pilih])
                                            if (data[nomor].jawaban == 'C' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[0] - 1;
                                            }

                                        }

                                    }}

                                    style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                                    <Text style={{ fontFamily: fonts.secondary[600], color: colors.black, fontSize: 14 }}>C. </Text>
                                    {pilih[nomor].c && <View style={{ position: 'absolute', left: -3, top: -5 }}><Icon type='ionicon' color={colors.secondary} name='checkmark-outline' /></View>}
                                    <RenderHtml
                                        contentWidth={'100%'}
                                        source={{
                                            html: data[nomor].c
                                        }}
                                    />

                                </TouchableOpacity>

                                <TouchableOpacity

                                    onPress={() => {

                                        if (!pilih[nomor].d) {
                                            pilih[nomor] = { b: false, c: false, a: false, d: true, e: false };
                                            setPilih([...pilih])
                                            if (data[nomor].jawaban == 'D' && !betul[nomor]) {
                                                betul[nomor] = true;
                                                setBetul([...betul])
                                                skor[nomor] = 1;
                                            } else if (data[nomor].jawaban == 'D' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[nomor] - 1;
                                            } else if (data[nomor].jawaban !== 'D' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[nomor] - 1;
                                            }
                                        } else {
                                            pilih[nomor] = { ...pilih[nomor], d: false };
                                            setPilih([...pilih])
                                            if (data[nomor].jawaban == 'D' && betul[nomor]) {
                                                betul[nomor] = false;
                                                setBetul([...betul])
                                                skor[nomor] = skor[0] - 1;
                                            }

                                        }

                                    }}

                                    style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                                    <Text style={{ fontFamily: fonts.secondary[600], color: colors.black, fontSize: 14 }}>D. </Text>
                                    {pilih[nomor].d && <View style={{ position: 'absolute', left: -3, top: -5 }}><Icon type='ionicon' color={colors.secondary} name='checkmark-outline' /></View>}
                                    <RenderHtml
                                        contentWidth={'100%'}
                                        source={{
                                            html: data[nomor].d
                                        }}
                                    />

                                </TouchableOpacity>




                            </View>

                        </View>


                    </ScrollView>
                }
            </View>

            <View style={{
                padding: 10,
            }}>



                <ScrollView horizontal>
                    {soal.map((i, index) => {
                        return (
                            <TouchableOpacity onPress={() => setNomor(index)} style={{
                                width: 30,

                                height: 30,
                                backgroundColor: sudah[index] == 1 ? colors.success : colors.danger,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 2,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white
                                }}>{index + 1}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>





            </View>
            <View style={{
                flexDirection: 'row',
                height: 40,
            }}>
                <View style={{
                    flex: 1,
                    padding: 2,
                }}>
                    {nomor > 0 && <TouchableOpacity onPress={() => {
                        // data.length
                        SoundPlayer.stop();

                        setNomor(nomor - 1);
                    }} style={{
                        padding: 5,
                        height: 40,
                        backgroundColor: colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <Text style={{

                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: 12
                        }}>Soal Sebelumnya</Text>
                    </TouchableOpacity>}
                </View>

                <View style={{
                    flex: 1,
                    padding: 2,
                    height: 40,
                }}>
                    {nomor < (data.length - 1) &&
                        <TouchableOpacity onPress={() => {
                            // data.length
                            SoundPlayer.stop();

                            if (!pilih[nomor].a && !pilih[nomor].b && !pilih[nomor].c && !pilih[nomor].d && !pilih[nomor].e) {
                                sudah[nomor] = 0;
                                setNomor(nomor + 1);
                            } else {
                                sudah[nomor] = 1;
                                setNomor(nomor + 1);
                                console.log(sudah);
                            }

                        }} style={{
                            padding: 5,
                            height: 40,

                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                            <Text style={{


                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: 12
                            }}>Lanjut Mengerjakan</Text>

                        </TouchableOpacity>}



                </View>
                <View style={{
                    flex: 1,
                    padding: 2,
                    height: 40,
                }}>
                    <TouchableOpacity onPress={sendServer} style={{
                        padding: 5,
                        height: 40,
                        flexDirection: 'row',
                        backgroundColor: colors.success,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <Text style={{


                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: 12
                        }}>Berhenti Mengerjakan</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})