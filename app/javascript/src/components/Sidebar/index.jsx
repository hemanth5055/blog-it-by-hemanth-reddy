import React, { useRef } from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { Book, List, Edit, LeftArrow, Folder } from "neetoicons";
import { Avatar, Button, Popover, Typography } from "neetoui";
import { isNil, isEmpty, either, equals } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import routes from "src/routes";
import QueryClient from "utils/QueryClient";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import { EMAIL_KEY, USERNAME_KEY } from "./constants";
import Element from "./Element";

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
      QueryClient.clear();
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
  const isShowPage = location.pathname.split("/").at(-1) === "show";

  return (
    <div className="flex w-fit flex-col items-center gap-5 bg-[#262626] px-5 py-5">
      <div className=" flex items-center justify-center rounded-md bg-[#393939] p-2 shadow-lg">
        <Book />
      </div>
      <div className="flex h-full w-full flex-col items-center gap-4">
        <Element
          icon={List}
          isActive={equals(routes.root, location.pathname) || isShowPage}
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
          isActive={equals(routes.myPosts, location.pathname)}
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
              label={t("labels.logout")}
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
