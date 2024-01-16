import {
  IPostCreateCommand,
  IPostReadDto,
  PostDesignEnum,
  PostVisibilityEnum,
} from "roottypes";
import { adminUser } from "../fixtures/adminUser";

describe("post", () => {
  let postToUpdate: IPostReadDto | undefined;
  let postToUseAsAChild: IPostReadDto | undefined;
  let postToDelete: IPostReadDto | undefined;

  beforeEach(() => {
    cy.login(true);
    cy.visit("/auth");
  });

  before(() => {
    const createPostCommand: IPostCreateCommand = {
      children: [],
      design: PostDesignEnum.Default,
      files: [],
      language: "en",
      posterId: adminUser._id,
      visibility: PostVisibilityEnum.Public,
      code: "Post code before update",
      title: "Post to update Title",
      content: "Post content",
    };
    cy.sendCreatePostRequest(createPostCommand, (res) => {
      postToUpdate = //@ts-ignore
        (res as { body: { data: IPostReadDto } }).body.data;
    });

    cy.sendCreatePostRequest(
      {
        ...createPostCommand,
        title: "Child post title",
        code: "Child post code",
        content: "Child post content",
      },
      (res) => {
        postToUseAsAChild = //@ts-ignore
          (res as { body: { data: IPostReadDto } }).body.data;
      }
    );

    cy.sendCreatePostRequest(
      {
        ...createPostCommand,
        title: "Post to delete title",
        code: "Post to delete code",
        content: "Post to delete content",
      },
      (res) => {
        postToDelete = //@ts-ignore
          (res as { body: { data: IPostReadDto } }).body.data;
      }
    );
  });

  it("should create a post", () => {
    const postTitle: string = "Created post title";
    const postSubTitle: string = "Created post sub-title";
    const postCode: string = "postCode";
    const postContent: string =
      "This is the post content. It's supposed to be big and to containt a lot of text";

    // Make sure that we aren't seeing the post content for now
    cy.getByDataCy("userPosts").contains(postTitle).should("not.exist");
    cy.getByDataCy("userPosts").contains(postSubTitle).should("not.exist");
    cy.getByDataCy("userPosts").contains(postContent).should("not.exist");

    // Open the post editor
    cy.getByDataCy("postForm").should("not.exist");
    cy.getByDataCy("writePostButton").click();
    cy.getByDataCy("postForm").should("exist").and("be.visible");

    // Filling basic fields
    cy.getByDataCy("postTitleInput").type(postTitle);
    cy.getByDataCy("postSubTitleInput").type(postSubTitle);
    cy.getByDataCy("postCodeInput").type(postCode);
    cy.selectInSelector("postVisibilityInput", 1);
    cy.selectInSelector("postDesignInput", 0);
    cy.get(".sun-editor-editable").type(postContent);

    // Select a child post
    cy.getByDataCy("sortablePost" + postToUseAsAChild?._id).should("not.exist");
    cy.getByDataCy("postsEditorSearchInput").type(
      postToUseAsAChild?.title?.at(0)?.text || ""
    );
    cy.getByDataCy("searchResult" + postToUseAsAChild?._id).click();
    cy.getByDataCy("sortablePost" + postToUseAsAChild?._id)
      .should("exist")
      .and("be.visible");

    // Now submit
    cy.getByDataCy("submitPost").click();
    cy.wait(1000);

    // Now reload and make sure our post is visible:
    cy.reload();
    cy.getByDataCy("userPosts")
      .contains(postTitle)
      .should("exist")
      .and("be.visible");
    cy.getByDataCy("userPosts")
      .contains(postContent)
      .should("exist")
      .and("be.visible");
  });

  it("should update a post", () => {
    const newPostTitle: string = "New post title";
    const newPostSubTitle: string = "New post sub-title";
    const newPostCode: string = "New post code";
    const newPostContent: string =
      "This is the post's NEWWWW content. It's supposed to be big and to containt a lot of text";

    // Make sure that we aren't seeing the post content for now
    cy.getByDataCy("userPosts").contains(newPostTitle).should("not.exist");
    cy.getByDataCy("userPosts").contains(newPostSubTitle).should("not.exist");
    cy.getByDataCy("userPosts").contains(newPostContent).should("not.exist");

    // Open the post editor
    cy.getByDataCy("postForm").should("not.exist");
    cy.getByDataCy("postOptionsForButtonForPost" + postToUpdate?._id).click();
    cy.getByDataCy("editButtonForPost" + postToUpdate?._id).click();
    cy.getByDataCy("postForm").should("exist").and("be.visible");

    // Filling basic fields
    cy.getByDataCy("postTitleInput").clear().type(newPostTitle);
    cy.getByDataCy("postSubTitleInput").clear().type(newPostSubTitle);
    cy.getByDataCy("postCodeInput").clear().type(newPostCode);
    cy.selectInSelector("postVisibilityInput", 1);
    cy.selectInSelector("postDesignInput", 0);
    cy.get(".sun-editor-editable").clear().type(newPostContent);

    // Select a child post
    cy.getByDataCy("sortablePost" + postToUseAsAChild?._id).should("not.exist");
    cy.getByDataCy("postsEditorSearchInput").type(
      postToUseAsAChild?.title?.at(0)?.text || ""
    );
    cy.getByDataCy("searchResult" + postToUseAsAChild?._id).click();
    cy.getByDataCy("sortablePost" + postToUseAsAChild?._id)
      .should("exist")
      .and("be.visible");

    // Now submit
    cy.getByDataCy("submitPost").click();
    cy.wait(1000);

    // Now reload and make sure our post is visible:
    cy.reload();
    cy.getByDataCy("userPosts")
      .contains(newPostTitle)
      .should("exist")
      .and("be.visible");
    cy.getByDataCy("userPosts")
      .contains(newPostContent)
      .should("exist")
      .and("be.visible");

    // Now reopen the post and make sure the values are ok
    // ReOpen the post editor
    cy.getByDataCy("postForm").should("not.exist");
    cy.getByDataCy("postOptionsForButtonForPost" + postToUpdate?._id).click();
    cy.getByDataCy("editButtonForPost" + postToUpdate?._id).click();
    cy.getByDataCy("postForm").should("exist").and("be.visible");

    // Making sure each field has the right value:
    cy.getByDataCy("postTitleInput").should("have.value", newPostTitle);
    cy.getByDataCy("postSubTitleInput").should("have.value", newPostSubTitle);
    cy.getByDataCy("postCodeInput").should("have.value", newPostCode);
    cy.get(".sun-editor-editable").contains(newPostContent).should("exist");
    cy.getByDataCy("sortablePost" + postToUseAsAChild?._id)
      .should("exist")
      .scrollIntoView()
      .and("be.visible");
  });

  it("should delete a post", () => {
    // Open the post editor
    cy.getByDataCy("postOptionsForButtonForPost" + postToDelete?._id)
      .should("exist")
      .and("be.visible");

    cy.getByDataCy("postOptionsForButtonForPost" + postToDelete?._id).click();
    cy.getByDataCy("deleteButtonForPost" + postToDelete?._id).click();
    cy.getByDataCy("confirmationModalConfirmButton").click();

    cy.wait(1000);
    cy.reload();

    // Now make sure that we can no longer see the post
    cy.getByDataCy("postOptionsForButtonForPost" + postToDelete?._id).should(
      "not.exist"
    );
  });
});
