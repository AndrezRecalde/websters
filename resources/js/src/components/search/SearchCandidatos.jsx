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
import { IconDatabase } from "@tabler/icons";
import React, { useEffect } from "react";
import { useDignidadesStore } from "../../hooks/useDignidadesStore";
import { useResultsStore } from "../../hooks/useResultsStore";
import { useStatesStore } from "../../hooks/useStatesStore";
import { ResultadosGrafico } from "../graphic/ResultadosGrafico";
import { ResultadosCandidatos } from "../table/ResultadosCandidatos";

const SearchCandidato = () => {
    const {
        cantones,
        parroquias,
        recintos,
        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
        startClearStates,
    } = useStatesStore();
    const { candidatos, startLoadPrefectosAlcaldes, startClearDignidades } =
        useDignidadesStore();
    const { startLoadResultsCandidatosProv,
            startLoadResultsCandidatosCant,
            startLoadResultsCandidatosParr,
            startLoadResultsCandidatosRec,
            resultsCandidatos,
            startClearResults } = useResultsStore();

    const form = useForm({
        initialValues: {
            iddignidad: 0,
            cod_canton: 0,
            cod_parroquia: 0,
            cod_recinto: 0,
            cuadrada: 1,
            legible: 1
        },
        validate: {
            iddignidad: (value) =>
                value === 0 || value === null
                    ? "Por favor selecciona una dignidad"
                    : null
        },
    });

    let { iddignidad, cod_canton, cod_parroquia, cod_recinto, cuadrada, legible } = form.values;

    useEffect(() => {
        startLoadCantones();
        startLoadPrefectosAlcaldes();

        return () => {
            startClearStates();
            startClearDignidades();
        };
    }, []);

    useEffect(() => {
        form.setFieldValue("cod_parroquia", 0);
        startLoadParroquias({ cod_canton });
    }, [cod_canton]);

    useEffect(() => {
        form.setFieldValue("cod_recinto", 0);
        startLoadRecintos({ cod_parroquia });
    }, [cod_parroquia]);

    useEffect(() => {
        //Quitar si se quiere la tabla persistente

        return () => {
            startClearResults();
        };
    }, [iddignidad, cod_canton, cuadrada, legible]);


    const handleSearch = (e) => {
        e.preventDefault();
        const { errors } = form.validate();
        if (
            !errors.hasOwnProperty("iddignidad") &&
            !errors.hasOwnProperty("cod_canton")
        ) {
            if(iddignidad !== 0 && (cod_canton === 0 || cod_canton === null) && (cod_parroquia === 0 || cod_parroquia === null) && (cod_recinto === 0 || cod_recinto === 0)){
                //console.log('Provinciales');
                startLoadResultsCandidatosProv(form.values);
                //console.log(form.values);
                //form.reset();
            }else if(iddignidad !== 0 && cod_canton !== 0 && (cod_parroquia === 0 || cod_parroquia === null) && (cod_recinto === 0 || cod_recinto === null)){
                //console.log('cantonales');
                startLoadResultsCandidatosCant(form.values);
                //console.log(form.values);
                //form.reset();
            } else if( iddignidad !== 0 && cod_canton !== 0 && cod_parroquia !== 0 && (cod_recinto === 0 || cod_recinto === null)){
                //console.log('Parroquiales');
                startLoadResultsCandidatosParr(form.values);
                //console.log(form.values);
                //form.reset();
            }else if( iddignidad !== 0 && cod_canton !== 0 && cod_parroquia !== 0 && cod_recinto !== 0){
                //console.log('Recintos');
                startLoadResultsCandidatosRec(form.values);
                //console.log(form.values);
                //form.reset();
            }
        }
    };

    return (
        <Container>
            <Card
                withBorder
                shadow="sm"
                p="lg"
                mt={50}
                radius="md"
                sx={{ position: "static" }}
            >
                <Card.Section withBorder inheritPadding py="md">
                    <Group position="apart">
                        <Text weight={500}>Resultados - Candidatos</Text>
                    </Group>
                </Card.Section>

                <Card.Section inheritPadding mt="sm" pb="lg">
                    <Grid grow gutter="sm">
                        <Grid.Col md={6} lg={3}>
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

                        <Grid.Col md={6} lg={3}>
                            <Select
                                label="Cant??n"
                                placeholder="Seleccione un cant??n"
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
                                styles={(theme) => ({
                                    item: {
                                      // applies styles to selected item
                                      '&[data-selected]': {
                                        '&, &:hover': {
                                          backgroundColor:
                                            theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.teal[1],
                                          color: theme.colorScheme === 'dark' ? theme.white : theme.colors.teal[9],
                                        },
                                      },

                                      // applies styles to hovered item (with mouse or keyboard)
                                      '&[data-hovered]': {},
                                    },
                                  })}
                            />
                        </Grid.Col>

                        <Grid.Col md={6} lg={3}>
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

                        <Grid.Col md={6} lg={3}>
                            <Select
                                label="Recinto"
                                placeholder="Seleccione un Recinto"
                                searchable
                                clearable
                                nothingFound="No options"
                                {...form.getInputProps("cod_recinto")}
                                data={recintos.map((recinto) => {
                                    return {
                                        label: recinto.nombre_recinto,
                                        value: recinto.cod_recinto,
                                    };
                                })}
                            />
                        </Grid.Col>
                    </Grid>

                        <Grid gutter="sm" mt={3}>
                        <Grid.Col sm={12} md={12} lg={6}>
                        <Select
                                    label="Actas Cuadradas"
                                    placeholder="??Filtrar actas cuadradas?"
                                    nothingFound="No options"
                                    {...form.getInputProps("cuadrada")}
                                    data={[
                                        {label: 'Si', value: 1},
                                        {label: 'No', value: 0}
                                    ]}
                                    defaultValue="Si"
                                />
                        </Grid.Col>
                            <Grid.Col sm={12} md={12} lg={6}>
                                <Select
                                    label="Actas Legibles"
                                    placeholder="??Filtrar actas legibles?"
                                    nothingFound="No options"
                                    {...form.getInputProps("legible")}
                                    data={[
                                        {label: 'No', value: 0},
                                        {label: 'Si', value: 1}
                                    ]}
                                    defaultValue="No"
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
                            Realizar B??squeda
                        </Button>
                    </Group>
                </Card.Section>
            </Card>

            {resultsCandidatos.length > 0
                ?
                <Container>
                <Grid grow>
                    <Grid.Col sm={12} md={12} lg={12}>
                        <ResultadosCandidatos />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={12}>
                        <ResultadosGrafico />
                    </Grid.Col>
                </Grid>
                </Container>
                :
                null}
        </Container>
    );
};

export default SearchCandidato;
