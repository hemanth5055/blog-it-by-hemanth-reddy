import React, { useRef } from "react";

import { Book, List, Edit, LeftArrow, Folder } from "@bigbinary/neeto-icons";
import { Avatar, Button, Popover, Typography } from "neetoui";
import { isNil, isEmpty, either } from "ramda";
import { useTranslation } from "react-i18next";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

import { EMAIL_KEY, USERNAME_KEY } from "./constants";
import Element from "./Element";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import routes from "../../routes";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage";

const Sidebar = () => {
  const { t } = useTranslation();

  const location = useLocation();

  const history = useHistory();

  const popoverRef = useRef(null);

  const userName = getFromLocalStorage(USERNAME_KEY);
  const userEmail = getFromLocalStorage(EMAIL_KEY);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      history.push(routes.login);
    } catch (error) {
      logger.error(error);
    }
  };

  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  if (!isLoggedIn) return null;

  const isCreatePage = location.pathname === routes.create;
  const isEditPage = location.pathname.split("/").at(-1) === "edit";

  return (
    <div className="flex w-fit flex-col items-center gap-5 bg-[#262626] px-5 py-5">
      <div className=" flex items-center justify-center rounded-md p-2">
        <Book />
      </div>
      <div className="flex h-full w-full flex-col items-center gap-4">
        <Element
          icon={List}
          isActive={location.pathname === routes.root}
          to={routes.root}
          tooltipContent={t("tooltips.posts")}
        />
        <Element
          icon={Edit}
          isActive={isCreatePage || isEditPage}
          to={routes.create}
          tooltipContent={t("tooltips.createPost")}
        />
        <Element
          icon={Folder}
          isActive={location.pathname === routes.myPosts}
          to={routes.myPosts}
          tooltipContent={t("tooltips.myPosts")}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <div ref={popoverRef}>
          <Avatar user={{ name: userName }} />
        </div>
        <Popover className="flex flex-col" reference={popoverRef}>
          <div className="flex items-center gap-5 pb-3">
            <Avatar user={{ name: userName }} />
            <div className="flex flex-col">
              <Typography style="h3" weight="medium">
                {userName}
              </Typography>
              <Typography style="body2">{userEmail}</Typography>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button
              className="flex w-full justify-center text-white"
              icon={LeftArrow}
              iconPosition="left"
              label="Logout"
              style="danger"
              onClick={handleLogout}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Sidebar;
