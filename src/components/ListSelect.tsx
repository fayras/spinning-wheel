import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useSnapshot } from "valtio";
import {
  state,
  setCurrent,
  showCreate,
  removeList,
  showEdit,
} from "@/state/lists";

export const ListSelect = () => {
  const list = useSnapshot(state);

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Menu>
        <MenuButton my="10" px="2" as={Heading} size="md" cursor="pointer">
          ▾ {list.currentList?.label}
        </MenuButton>
        <MenuList>
          {list.all.map((l) => (
            <MenuItem
              key={l.id}
              onClick={() => {
                setCurrent(l.id);
              }}
            >
              {l.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={IconButton} aria-label="Options" icon={<EditIcon />} />
        <MenuList>
          <MenuItem icon={<AddIcon />} onClick={() => showCreate(true)}>
            Create a new List
          </MenuItem>
          <MenuItem icon={<EditIcon />} onClick={() => showEdit(true)}>
            Edit Name
          </MenuItem>
          <MenuItem
            icon={<DeleteIcon />}
            onClick={() => {
              removeList(list.currentList?.id);
            }}
          >
            Delete List
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
