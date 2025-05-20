import { createContext, ReactNode, useState } from 'react';
import DialogosEnum from '../enums/Dialogos';
import CaixaDialogo from '../components/CaixaDialogo';


export type Dialogo = {
    text: string[]
}

export interface IDialogContext {
    dialogConfig: Dialogo | null,
    triggerDialog: (dialogo: DialogosEnum) => void,
    closeDialog: () => void
}

export const DialogosContext = createContext({} as IDialogContext);


type Props = {
    children: ReactNode
}

export const DialogosContextProvider = ({ children }:Props) => {

    const [dialogConfig, setDialogConfig] = useState<Dialogo|null>(null);


    const triggerDialog = async (dialogo: DialogosEnum) => {
        const dialogData = await getDialog(dialogo);
        setDialogConfig(dialogData);
    };


    const closeDialog = () => {
        setDialogConfig(null);
    };


    const getDialog = async (dialogo: DialogosEnum): Promise<Dialogo> => {
        try {
            const response = await fetch(`/dialogs/${dialogo}.json`);
            if (!response.ok) {
                throw new Error("Erro ao carregar o diálogo");
            }
            
            const responseData = await response.json()

            return responseData as Dialogo;

        } catch (error) {
            console.error("Erro ao carregar o diálogo:", error);
            return { text: ["Erro ao carregar diálogo"] };
        }
    };


    return (
        <DialogosContext.Provider value={{ dialogConfig, triggerDialog, closeDialog }}>
        {children}
        {dialogConfig && <CaixaDialogo {...dialogConfig} onClose={closeDialog} />}
        </DialogosContext.Provider>
    );
};
