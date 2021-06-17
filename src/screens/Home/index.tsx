import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import {
    Container,
    HeaderContent,
    Header,
    TotalCars,
    CarList
} from './styles';

const carOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
        price: 150,
        period: 'Ao dia'
    },
    thumbnail: 'https://pngimage.net/wp-content/uploads/2018/05/audi-rs-png-5.png',
}
// const carTwo = {
//     brand: 'Porsche',
//     name: 'Panamera',
//     rent: {
//         price: 320,
//         period: 'Ao dia'
//     },
//     thumbnail: 'https://pngimage.net/wp-content/uploads/2018/05/audi-rs-png-5.png',
// }

export function Home() {
    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Container>
                <Header>
                    <HeaderContent>
                        <Logo
                            width={RFValue(108)}
                            height={RFValue(12)}
                        />
                        <TotalCars>
                            Total de 12 carros
                        </TotalCars>
                    </HeaderContent>
                </Header>

                <CarList
                    data={[1, 2, 3, 4, 5, 6, 7,]}
                    keyExtractor={item => String(item)}
                    renderItem={(item) => <Car data={carOne} />}
                />



            </Container>
        </>
    );
}