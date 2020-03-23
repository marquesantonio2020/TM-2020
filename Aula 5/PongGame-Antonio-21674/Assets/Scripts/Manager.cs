using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
public class Manager : MonoBehaviour
{
    [Header("Ball")]
    public GameObject ball;

    [Header("Score UI")]
    public GameObject player1text;

    private int playerScore = 0;

    public void Player1Scored()
    {
        playerScore++;//Increment score
        player1text.GetComponent<TextMeshProUGUI>().text = playerScore.ToString(); //update score text
        ball.GetComponent<Ball>().IncreaseSpeed(); //Increase speed of ball. IncreaseSpeed() is a method in Ball script of ball object
    }

    public void Reset()
    {
        playerScore = 0;
        player1text.GetComponent<TextMeshProUGUI>().text = playerScore.ToString();
    }
}
