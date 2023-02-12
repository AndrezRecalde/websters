import {
    ActionIcon,
    Button,
    Card,
    Container,
    Divider,
    Flex,
    Grid,
    Group,
    Select,
    Text,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDatabase, IconHelp } from "@tabler/icons";
import React, { useEffect } from "react";
import { useActasStore } from "../../hooks/useActasStore";
import { useDignidadesStore } from "../../hooks/useDignidadesStore";
import { useResultsStore } from "../../hooks/useResultsStore";
import { useStatesStore } from "../../hooks/useStatesStore";
import { useUiStore } from "../../hooks/useUiStore";
import { TotalEscrutinioPage } from "../escrutinio/TotalEscrutinioPage";

import WebsterTable from "../table/WebsterTableConcejales";
import { ModalHelp } from "../ui/ModalHelp";
import { TotalesConcejalesPage } from "./totales/TotalesConcejalesPage";

const SearchConcejalesPage = () => {
    const {
        cantones,
        startLoadCantonesUrbanos,
        startLoadCantonesRurales,
        startClearStates,
    } = useStatesStore();

    const { concejales, startLoadConcejales, startClearDignidades } =
        useDignidadesStore();

    const {
        resultsConcejales,
        startLoadResultsConcejalesUrbanos,
        startLoadResultsConcejalesRurales,
        startClearResults,
    } = useResultsStore();

    const {
        startLoadTotalActasIngresadasCanton,
        startLoadTotalJuntasCantonesUrbanos,
        startLoadTotalJuntasCantonesRural,
        startClearActas,
        totalIngresadas,
        totalJuntas,
    } = useActasStore();

    const { modalAction } = useUiStore();

    const form = useForm({
        initialValues: {
            iddignidad: 0,
            cod_canton: 0,
        },

        validate: {
            iddignidad: (value) =>
                value === 0 || value === null
                    ? "Por favor selecciona una dignidad"
                    : null,
            cod_canton: (value) =>
                value === 0 || value === null
                    ? "Por favor selecciona un cantón"
                    : null,
        },
    });

    const { iddignidad, cod_canton } = form.values;

    useEffect(() => {
        //Quitar si se quiere la tabla persistente

        return () => {
            startClearResults();
            startClearActas();
        };
    }, [iddignidad, cod_canton]);

    useEffect(() => {
        startLoadConcejales();

        return () => {
            startClearDignidades();
        };
    }, []);

    useEffect(() => {
        if (iddignidad === 3) {
            startLoadCantonesUrbanos();
        } else if (iddignidad === 4) {
            startLoadCantonesRurales();
        }

        return () => {
            startClearStates();
        };
    }, [iddignidad]);

    const handleSearch = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("iddignidad") &&
            !errors.hasOwnProperty("cod_canton") &&
            iddignidad === 3
        ) {
            //console.log('urbanos');
            startLoadResultsConcejalesUrbanos(form.values);
            startLoadTotalActasIngresadasCanton(iddignidad, cod_canton);
            startLoadTotalJuntasCantonesUrbanos(cod_canton);
            form.reset();
        } else if (iddignidad === 4) {
            //console.log('rurales');
            startLoadResultsConcejalesRurales(form.values);
            startLoadTotalActasIngresadasCanton(iddignidad, cod_canton);
            startLoadTotalJuntasCantonesRural(cod_canton);
            form.reset();
        }
    };

    return (
        <Container size="xl">
            <Title order={3} mt={20} align="center">
                <Text span c="white" inherit>
                    Resultados Webster Concejales
                </Text>
            </Title>
            <Divider my="sm" />
            <Grid>
                <Grid.Col sm={12} md={4} lg={4}>
                    <Card
                        withBorder
                        shadow="sm"
                        p="lg"
                        mt={10}
                        radius="md"
                        sx={{ position: "static", height: "310px" }}
                    >
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position="apart">
                                <Text weight={600}>Filtros</Text>
                                <ActionIcon
                                    onClick={() => modalAction("open")}
                                    variant="subtle"
                                >
                                    <IconHelp size={22} />
                                </ActionIcon>
                            </Group>
                        </Card.Section>

                        <Card.Section inheritPadding mt="sm" pb="lg">
                            <Grid grow gutter="sm">
                                <Grid.Col md={12} lg={12}>
                                    <Select
                                        label="Dignidad"
                                        placeholder="Seleccione una Dignidad"
                                        searchable
                                        clearable
                                        nothingFound="No options"
                                        {...form.getInputProps("iddignidad")}
                                        data={concejales.map((concejal) => {
                                            return {
                                                label: concejal.nombre_dignidad,
                                                value: concejal.iddignidad,
                                            };
                                        })}
                                    />
                                </Grid.Col>

                                <Grid.Col md={12} lg={12}>
                                    <Select
                                        label="Cantón"
                                        placeholder="Seleccione un cantón"
                                        searchable
                                        clearable
                                        nothingFound="No options"
                                        {...form.getInputProps("cod_canton")}
                                        data={cantones.map((canton) => {
                                            return {
                                                label: canton.nombre_canton,
                                                value: canton.cod_canton,
                                            };
                                        })}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Card.Section>

                        <Card.Section inheritPadding mt="sm" pb="md">
                            <Group position="center">
                                <Button
                                    mt={5}
                                    leftIcon={<IconDatabase />}
                                    variant="outline"
                                    color="teal"
                                    onClick={handleSearch}
                                >
                                    Realizar Búsqueda
                                </Button>
                            </Group>
                        </Card.Section>
                    </Card>
                </Grid.Col>

                {resultsConcejales.length > 0 ? (
                    <>
                        <Grid.Col sm={12} md={4} lg={4}>
                            <TotalesConcejalesPage />
                        </Grid.Col>
                        <Grid.Col sm={12} md={4} lg={4}>
                            <Flex justify="center" align="center">
                                <Card
                                    mt={10}
                                    shadow="sm"
                                    p="lg"
                                    sx={{ height: "auto", width: "400px" }}
                                >
                                    <Card.Section
                                        withBorder
                                        inheritPadding
                                        py="xs"
                                    >
                                        <Text
                                            size="xs"
                                            transform="uppercase"
                                            weight={700}
                                            color="dimmed"
                                            >Total Actas
                                        </Text>
                                    </Card.Section>
                                    <Card.Section
                                        withBorder
                                        inheritPadding
                                        py="xs"
                                    >
                                        <TotalEscrutinioPage />
                                    </Card.Section>

                                    {totalJuntas[0]?.total -
                                        totalIngresadas[0]?.digitadas ===
                                    0 ? (
                                        <Title order={5} mt={20} align="center">
                                            <Text size="xs"
                                                transform="uppercase"
                                                weight={700} c="green" inherit>
                                                Actas 100% Ingresadas
                                            </Text>
                                        </Title>
                                    ) : (
                                        <Title order={5} mt={20} align="center">
                                            <Text
                                                size="xs"
                                                transform="uppercase"
                                                weight={700}
                                                c="red"
                                                inherit
                                            >
                                                Faltan{" "}
                                                {totalJuntas[0]?.total -
                                                    totalIngresadas[0]
                                                        ?.digitadas}{" "}
                                                Actas por ingresar
                                            </Text>
                                        </Title>
                                    )}
                                </Card>
                            </Flex>
                        </Grid.Col>
                    </>
                ) : null}
            </Grid>
            {resultsConcejales.length > 0 ? <WebsterTable /> : null}
            <ModalHelp />
        </Container>
    );
};

export default SearchConcejalesPage;
