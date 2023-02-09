import { Badge, Card, Grid, Group, Table, Text, Title } from "@mantine/core";
import React, { useCallback } from "react";
import { useResultsStore } from "../../hooks/useResultsStore";

export const ResultadosCandidatos = () => {
    const { resultsCandidatos } = useResultsStore();

    const rows = resultsCandidatos?.map((results, i) => {
        return (
            <tr key={i}>
                <td>{results.lista}</td>
                <td>{results.nombre}</td>
                <td>{results.total_votos}</td>
            </tr>
        )
    })


    const fechaActual = useCallback(() => {
        let hoy = new Date();

        return hoy.toLocaleString();
    }, [resultsCandidatos]);

    return (
        <>
            <Title order={3} align="center" mt={50}>
                <Text span c="white" inherit>
                    {resultsCandidatos[0].nombre_dignidad.toUpperCase()}
                </Text>
                <Group position="center">
                <Badge
                    size="lg"
                    radius="xl"
                    color="indigo"
                >
                    {`Fecha & Hora del reporte: ${fechaActual()}`}
                </Badge>
                </Group>
            </Title>

            <Table
                mt="md"
                mb="md"
                fontSize="md"
                verticalSpacing="sm"
                striped
                withBorder
                withColumnBorders
            >
                <thead>
                    <tr>
                        <th>Lista</th>
                        <th>Candidato</th>
                        <th>Total Votos</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <Grid grow>
                <Grid.Col span={6}>
                    <Card
                        withBorder
                        radius="md"
                        p="xl"
                        sx={(theme) => ({
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[7]
                                    : theme.white,
                        })}
                    >
                        <Text
                            size="xs"
                            transform="uppercase"
                            weight={700}
                            color="dimmed"
                        >
                            Total Votos en Blanco
                        </Text>
                        <Text size="lg" weight={500}>
                            {resultsCandidatos[0].total_votos_blancos}
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card
                        withBorder
                        radius="md"
                        p="xl"
                        sx={(theme) => ({
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[7]
                                    : theme.white,
                        })}
                    >
                        <Text
                            size="xs"
                            transform="uppercase"
                            weight={700}
                            color="dimmed"
                        >
                            Total Votos Nulos
                        </Text>
                        <Text size="lg" weight={500}>
                            {resultsCandidatos[0].total_votos_nulos}
                        </Text>
                    </Card>
                </Grid.Col>
            </Grid>
        </>
    );
};
