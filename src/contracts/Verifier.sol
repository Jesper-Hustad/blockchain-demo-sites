// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Verifier {
  
    event Credentials(address signer, string description);
   
    function createCredentials(string memory _description, uint8 v, bytes32 r, bytes32 s) public {
        bytes32 message = keccak256(abi.encodePacked(_description));
        address signer = ecrecover(message, v, r, s);
        emit Credentials(signer, _description);
    }

    function getCredentials(address addr) public view returns(string memory){
        return "test";
    }
}