import {
    ActionIcon,
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Group,
    Select,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDatabase, IconHelp } from "@tabler/icons";
import React, { useEffect } from "react";
import { useActasStore } from "../../hooks/useActasStore";
import { useDignidadesStore } from "../../hooks/useDignidadesStore";
import { useResultsStore } from "../../hooks/useResultsStore";
import { useStatesStore } from "../../hooks/useStatesStore";
import { useUiStore } from "../../hooks/useUiStore";
import { EscConcejales } from "../escrutinio/EscConcejales";

import WebsterTableJuntas from "../table/WebsterTableJuntas";
import { ModalHelp } from "../ui/ModalHelp";

const SearchJuntasPage = () => {
    const {
        cantones,
        parroquias,
        startLoadCantonesRurales,
        startLoadParroquiasRurales,
        startClearStates,
    } = useStatesStore();
    const { juntas, startLoadJuntas, startClearDignidades } =
        useDignidadesStore();
    const {
        resultsJuntasParroquiales,
        startLoadResultsJuntas,
        startClearResults,
    } = useResultsStore();

    const { startLoadTotalJuntasParr,
            startLoadTotalActasIngresadasJuntas } = useActasStore();

    const { modalAction } = useUiStore();

    const form = useForm({
        initialValues: {
            iddignidad: 5,
            cod_canton: 0,
            cod_parroquia: 0,
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
            cod_parroquia: (value) =>
                value === 0 || value === null
                    ? "Por favor seleccione una parroquia"
                    : null,
        },
    });

    const { iddignidad, cod_canton, cod_parroquia } = form.values;

    useEffect(() => {
        form.setFieldValue("cod_parroquia", 0);
        startLoadParroquiasRurales({ cod_canton });
    }, [cod_canton]);

    useEffect(() => {
        //Quitar si se quiere la tabla persistente

        return () => {
            startClearResults();
        };
    }, [iddignidad, cod_canton]);

    useEffect(() => {
        startLoadCantonesRurales();
        startLoadJuntas();

        return () => {
            startClearStates();
            startClearDignidades();
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("iddignidad") &&
            !errors.hasOwnProperty("cod_canton") &&
            !errors.hasOwnProperty("cod_parroquia")
        ) {
            startLoadResultsJuntas(form.values);
            startLoadTotalJuntasParr(cod_parroquia);
            startLoadTotalActasIngresadasJuntas(iddignidad, cod_parroquia);
            form.reset();
        }
    };

    return (
        <Container>
            <Grid>
                <Grid.Col span={8}>
                    <Card
                        withBorder
                        shadow="sm"
                        p="lg"
                        mt={50}
                        radius="md"
                        sx={{ position: "static" }}
                    >
                        <Card.Section withBorder inheritPadding py="xs">
                            <Group position="apart">
                                <Text weight={500}>
                                    Webster - Juntas Parroquiales
                                </Text>
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
                                <Grid.Col md={6} lg={4}>
                                    <Select
                                        disabled
                                        label="Dignidad"
                                        placeholder="Seleccione una Dignidad"
                                        searchable
                                        clearable
                                        nothingFound="No options"
                                        {...form.getInputProps("iddignidad")}
                                        data={juntas.map((junta) => {
                                            return {
                                                label: junta.nombre_dignidad,
                                                value: junta.iddignidad,
                                            };
                                        })}
                                    />
                                </Grid.Col>

                                <Grid.Col md={6} lg={4}>
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

                                <Grid.Col md={6} lg={4}>
                                    <Select
                                        label="Parroquia"
                                        placeholder="Seleccione una Parroquia"
                                        searchable
                                        clearable
                                        nothingFound="No options"
                                        {...form.getInputProps("cod_parroquia")}
                                        data={parroquias.map((parroquia) => {
                                            return {
                                                label: parroquia.nombre_parroquia,
                                                value: parroquia.cod_parroquia,
                                            };
                                        })}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Card.Section>

                        <Card.Section inheritPadding mt="sm" pb="md">
                            <Group position="center">
                                <Button
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

            {resultsJuntasParroquiales.length > 0 ? (
                <Grid.Col span={4}>
                    <Flex justify="center" align="center">
                        <Card
                            mt={20}
                            shadow="sm"
                            p="lg"
                            sx={{ height: "400px", width: "600px" }}
                        >
                            <EscConcejales />
                        </Card>
                    </Flex>
                </Grid.Col>

            ) : null }


            </Grid>
            {resultsJuntasParroquiales.length > 0 ? (
                <WebsterTableJuntas />
            ) : null}
            <ModalHelp />
        </Container>
    );
};

export default SearchJuntasPage;
