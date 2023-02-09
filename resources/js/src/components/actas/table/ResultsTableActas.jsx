import { Badge, Container, Group, Table, Text, Title } from "@mantine/core";
import React, { useCallback } from "react";
import { useActasStore } from "../../../hooks/useActasStore";


export const ResultsTableActas = () => {

    const { actas } = useActasStore();

    const rows = actas?.map((results, i) => {
        return (
            <tr key={i}>
                <td>{results.nombre_canton}</td>
                <td>{results.nombre_parroquia}</td>
                <td>{results.nombre_zona}</td>
                <td>{results.nombre_recinto}</td>
                <td>{results.junta_string}</td>
                <td>{results.nombre_dignidad}</td>
                <td>{results.num_validos}</td>
                <td>{results.num_blancos}</td>
                <td>{results.num_nulos}</td>
                <td>{results.cuadrada === 1 ? 'Consistente' : 'Inconsistente'}</td>
                <td>{results.nombres}</td>
            </tr>
        )
    });

    const fechaActual = useCallback(() => {
        let hoy = new Date();

        return hoy.toLocaleString();
    }, [actas]);


    return (
        <Container size={1200}>
            <Title order={3} align="center" mt={50}>
                <Text span c="white" inherit>
                    {actas[0].nombre_dignidad.toUpperCase()}
                </Text>
                <Group position="center">
                    <Badge size="lg" radius="xl" color="indigo">
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
                        <th>Canton</th>
                        <th>Parroquia</th>
                        <th>Zona</th>
                        <th>Recinto</th>
                        <th>Junta</th>
                        <th>Dignidad</th>
                        <th>Total de Huellas</th>
                        <th>Votos Blancos</th>
                        <th>Votos Nulos</th>
                        <th>¿Consistente?</th>
                        <th>Digitador</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Container>
    );
};
