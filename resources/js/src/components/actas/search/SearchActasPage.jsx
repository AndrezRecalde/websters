import {
    Button,
    Card,
    Container,
    Grid,
    Group,
    Select,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDatabase, IconDatabaseExport } from "@tabler/icons";
import React, { useEffect } from "react";
import { useActasStore } from "../../../hooks/useActasStore";
import { useDignidadesStore } from "../../../hooks/useDignidadesStore";
import { useStatesStore } from "../../../hooks/useStatesStore";
import { ResultsTableActas } from "../table/ResultsTableActas";

export const SearchActasPage = () => {
    const {
        cantones,
        parroquias,
        startLoadCantones,
        startLoadParroquias,
        startClearStates,
    } = useStatesStore();

    const { startClearActas, startExportExcelActas } = useActasStore();

    const { candidatos, startLoadDignidades, startClearDignidades } =
        useDignidadesStore();

    const { actas, startLoadActas, startLoadAllActas, startExportExcelActasAll } = useActasStore();

    const form = useForm({
        initialValues: {
            iddignidad: 0,
            cod_canton: 0,
            cod_parroquia: 0,
            tipo_acta: "",
        },

        validate: {
            iddignidad: (value) =>
                value === 0 || value === null
                    ? "Por favor selecciona una dignidad"
                    : null,
        },
    });

    const { iddignidad, cod_canton, cod_parroquia, tipo_acta } = form.values;

    useEffect(() => {
        form.setFieldValue("cod_parroquia", 0);
        startLoadParroquias({ cod_canton });
    }, [cod_canton]);

    useEffect(() => {
        //Quitar si se quiere la tabla persistente

        return () => {
            startClearActas();
        };
    }, [iddignidad, cod_canton]);

    useEffect(() => {
        startLoadCantones();
        startLoadDignidades();

        return () => {
            startClearStates();
            startClearDignidades();
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (!errors.hasOwnProperty("iddignidad")) {
            if((tipo_acta === null || tipo_acta === "")){
                startLoadAllActas(form.values);
                console.log(form.values);
                form.reset();
            } else if((tipo_acta !== null || tipo_acta !== "") && (cod_canton === null || cod_parroquia === null)) {
                startLoadActas(form.values);
                console.log(form.values);
                form.reset();
            }

        }
    };

    const handleExportExcel = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (!errors.hasOwnProperty("iddignidad")) {

            if(tipo_acta === null || tipo_acta === ""){
                startExportExcelActasAll(form.values);
                console.log(form.values);
                form.reset();
            } else if((tipo_acta !== null || tipo_acta !== "") && (cod_canton === null || cod_parroquia === null)){
                startExportExcelActas(form.values);
                console.log(form.values);
                form.reset();
            }

        }
    }

    return (
        <>
            <Container>
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
                            <Text weight={500}>Busqueda de Actas</Text>
                            <Button onClick={handleExportExcel} variant="light" color="teal" radius="md" size="xs" leftIcon={
                                        <IconDatabaseExport
                                            size={15}
                                            color="green"
                                        />
                                    }>
                                Excel
                            </Button>
                        </Group>
                    </Card.Section>

                    <Card.Section inheritPadding mt="sm" pb="lg">
                        <Grid grow gutter="sm">
                            <Grid.Col md={6} lg={4}>
                                <Select
                                    label="Dignidad"
                                    placeholder="Seleccione una Dignidad"
                                    searchable
                                    clearable
                                    nothingFound="No options"
                                    {...form.getInputProps("iddignidad")}
                                    data={candidatos.map((candidato) => {
                                        return {
                                            label: candidato.nombre_dignidad,
                                            value: candidato.iddignidad,
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

                            <Grid.Col md={12} lg={12}>
                                <Select
                                    label="Tipo de Acta"
                                    placeholder="Seleccione un tipo de Acta"
                                    searchable
                                    clearable
                                    nothingFound="No options"
                                    {...form.getInputProps("tipo_acta")}
                                    data={[
                                        { label: "TODAS", value: "" },
                                        { label: "Consistentes", value: 1 },
                                        { label: "Inconsistentes", value: 0 },
                                    ]}
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
            </Container>
            {actas.length > 0 ? <ResultsTableActas /> : null}
        </>
    );
};
