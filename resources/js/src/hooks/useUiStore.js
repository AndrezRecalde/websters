import { useDispatch, useSelector } from "react-redux"
import { onCloseModal, onOpenModal } from "../store/ui/uiSlice";


export const useUiStore = () => {

    const { isOpenModal } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const modalAction = (behavior) => {
        if(behavior === "open"){
            dispatch(onOpenModal());
        } else if(behavior === "close"){
            dispatch(onCloseModal());
        }
    }

  return {
    isOpenModal,

    modalAction
  }
}
