import React, { useRef, useState } from "react";

import { Book, List, Edit, Category, LeftArrow } from "@bigbinary/neeto-icons";
import { Avatar, Button, Popover, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { EMAIL_KEY, USERNAME_KEY } from "./constants";
import Element from "./Element";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import routes from "../../routes";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/storage";
import withT from "../../utils/withT";
import CategorySidebar from "../Category";

const Sidebar = () => {
  const { t } = useTranslation();
  const [showCategories, setShowCategories] = useState(false);
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

  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-5">
        <div className=" flex items-center justify-center rounded-md p-2">
          <Book />
        </div>
        <div className="flex h-full w-full flex-col items-center gap-4">
          <Element
            icon={List}
            to={routes.root}
            tooltipContent={t("tooltips.posts")}
          />
          <Element
            icon={Edit}
            to={routes.create}
            tooltipContent={t("tooltips.createPost")}
          />
          <Element
            icon={Category}
            tooltipContent={t("tooltips.viewAndAddCategories")}
            onClick={() => setShowCategories(true)}
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
      <CategorySidebar
        setShowCategories={setShowCategories}
        showCategories={showCategories}
      />
    </>
  );
};

export default withT(Sidebar);
