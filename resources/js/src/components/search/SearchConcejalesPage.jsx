import {
    ActionIcon,
    Button,
    Card,
    Container,
    Grid,
    Group,
    Select,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDatabase, IconHelp } from "@tabler/icons";
import React, { useEffect } from "react";
import { useDignidadesStore } from "../../hooks/useDignidadesStore";
import { useResultsStore } from "../../hooks/useResultsStore";
import { useStatesStore } from "../../hooks/useStatesStore";
import { useUiStore } from "../../hooks/useUiStore";


import WebsterTable from "../table/WebsterTableConcejales";
import { ModalHelp } from "../ui/modalHelp";

const SearchConcejalesPage = () => {
    const { cantones, startLoadCantonesUrbanos, startLoadCantonesRurales, startClearStates } = useStatesStore();
    const { concejales, startLoadConcejales, startClearDignidades } =
        useDignidadesStore();
    const { resultsConcejales, startLoadResultsConcejalesUrbanos, startLoadResultsConcejalesRurales, startClearResults } =
        useResultsStore();
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
        };
    }, [iddignidad, cod_canton]);

    useEffect(() => {
        startLoadConcejales();

        return () => {
            startClearDignidades();
        };
    }, []);

    useEffect(() => {
        if(iddignidad === 3){
            startLoadCantonesUrbanos();
        } else if(iddignidad === 4){
            startLoadCantonesRurales();
        }

      return () => {
        startClearStates();
      }
    }, [iddignidad])


    const handleSearch = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("iddignidad") &&
            !errors.hasOwnProperty("cod_canton") &&
            iddignidad === 3
        ) {
            console.log('urbanos');
            startLoadResultsConcejalesUrbanos(form.values);
            form.reset();
        } else if( iddignidad === 4){
            console.log('rurales');
            startLoadResultsConcejalesRurales(form.values);
            form.reset();
        }
    };

    return (
        <Container>
            <Grid>
                <Grid.Col span={12}>
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
                                <Text weight={500}>Webster - Concejales</Text>
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
                                <Grid.Col md={6} lg={6}>
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

                                <Grid.Col md={6} lg={6}>
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
            </Grid>

            {resultsConcejales.length > 0 ? <WebsterTable /> : null}
            <ModalHelp />
        </Container>
    );
};

export default SearchConcejalesPage;