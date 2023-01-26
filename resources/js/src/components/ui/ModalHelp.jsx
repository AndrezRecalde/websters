import { Alert, Modal } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import { useUiStore } from "../../hooks/useUiStore";

export const ModalHelp = () => {
    const { isOpenModal, modalAction } = useUiStore();

    return (
        <Modal
            opened={isOpenModal}
            onClose={() => modalAction("close")}
            title="Información"
        >
            <Alert
                icon={<IconAlertCircle size={16} />}
                title="Ayuda"
                color="green"
            >
                Los candidatos que se encuentran marcados en la tabla
                son los candidatos a entrar al puesto.
                Si existe un empate tecnico de votos, el CNE eligirá a la persona
                ganadora en el cual analizarán otros aspectos politicos.
            </Alert>
        </Modal>
    );
};
