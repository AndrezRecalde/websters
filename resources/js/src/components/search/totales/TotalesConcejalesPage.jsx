import { Card, Text } from "@mantine/core";
import React from "react";
import { useResultsStore } from "../../../hooks/useResultsStore";

export const TotalesConcejalesPage = () => {
    const { resultsConcejales } = useResultsStore();
    return (
        <>
            <Card
                mt={10}
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
                    Total de Huellas/Firmas
                </Text>
                <Text size="lg" weight={500}>
                    {resultsConcejales[0]?.total_votos_validos}
                </Text>
            </Card>
            <Card
                mt={10}
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
                    {resultsConcejales[0]?.total_votos_blancos}
                </Text>
            </Card>
            <Card
                mt={10}
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
                    {resultsConcejales[0]?.total_votos_nulos}
                </Text>
            </Card>
        </>
    );
};
