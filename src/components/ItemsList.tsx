import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { List } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { state } from "@/state/lists";

import { ListItem } from "./ListItem";

export const ItemsList = () => {
  const mState = useSnapshot(state);

  const items = useMemo(
    () => [...mState.currentItems].reverse(),
    [mState.currentItems]
  );

  return (
    <List mt="3" spacing={2} maxHeight={400}>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </List>
  );
};
