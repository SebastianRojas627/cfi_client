import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RespuestaSujeto } from "../api/types";
import { SegipInfo } from "./SegipInfo";
import { ItvInfo } from "./ItvInfo";
import { AnhInfo } from "./AnhInfo";
import { SinarapInfo } from "./SinarapInfo";

interface SearchResultModalProps {
  open: boolean;
  onClose: () => void;
  result: RespuestaSujeto;
}

export const SearchResultModal: React.FC<SearchResultModalProps> = ({
  open,
  onClose,
  result,
}) => {

  console.log(result)
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Resultado del Sujeto #{result.sujeto}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {result.segip && <SegipInfo segip={result.segip} />}
        {result.itv && result.itv.datos_tecnicos && (
          <ItvInfo itv={result.itv} />
        )}
        {result.anh && (
          <AnhInfo
            anh={{
              ...result.anh.vehiculo,
              cargas_combustible: result.anh.cargas_combustible,
            }}
          />
        )}
        {result.sinarap && <SinarapInfo sinarap={result.sinarap} />}
      </DialogContent>
    </Dialog>
  );
};
