# 104. Maximum Depth of Binary Tree
> Given a binary tree, find its maximum depth.
> 
> The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node

    /**
     * Definition for a binary tree node.
     * struct TreeNode {
     * int val;
     * TreeNode *left;
     * TreeNode *right;
     * TreeNode(int x) : val(x), left(NULL), right(NULL) {}
     * };
     */
    
    class Solution {
    public:
    	int maxDepth(TreeNode* root) {
    		int depth=1;
    		int left=1,right=1;
    		if(root==NULL)
    			return 0;
    		left+=maxDepth(root->left);
    		right+=maxDepth(root->right);
    		return left>right?left:right;
    	} 
     
    
    };