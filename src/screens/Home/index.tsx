import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StatusBar, BackHandler } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { api } from "../../services/api";

import { Car } from "../../components/Car";
import { Container, HeaderContent, Header, TotalCars, CarList } from "./styles";

import { CarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";

export function Home() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

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
            <Logo width={RFValue(108)} height={RFValue(12)} />
            {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
          </HeaderContent>
        </Header>
        {loading ? (
          <LoadAnimation />
        ) : (
          <CarList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Car data={item} onPress={() => handleCarDetails(item)} />
            )}
          />
        )}
      </Container>
    </>
  );
}
