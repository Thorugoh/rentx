import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { format } from "date-fns/esm";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { CarDTO } from "../../dtos/CarDTO";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps,
} from "../../components/Calendar";

import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();

  const [lasSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDate, setMarkedDate] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lasSelectedDate.timestamp ? date : lasSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDate(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDate),
    });
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={handleBack} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDate={markedDate} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          enabled={!!rentalPeriod.startFormatted}
          title="Confirmar"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
