package com.example.loginapp

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AttachFile
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.loginapp.ui.theme.LoginAppTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(modifier: Modifier = Modifier) {
    var inputText by remember { mutableStateOf("") }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFF1E1E2E)) // Dark background similar to screenshot
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            horizontalAlignment = Alignment.Start
        ) {
            Spacer(modifier = Modifier.height(60.dp))

            // Main heading
            Text(
                text = "Hello there,",
                fontSize = 32.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFFFF6B9D), // Pink color like in screenshot
                modifier = Modifier.padding(bottom = 4.dp)
            )

            Text(
                text = "Fellow Developer",
                fontSize = 32.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFFFF6B9D), // Pink color like in screenshot
                modifier = Modifier.padding(bottom = 32.dp)
            )

            // Subtitle
            Text(
                text = "What would you like to build today?",
                fontSize = 18.sp,
                color = Color.White,
                modifier = Modifier.padding(bottom = 60.dp)
            )

            // Helper text
            Text(
                text = "Here is a few things I can help you with :",
                fontSize = 14.sp,
                color = Color(0xFFB0B0B0),
                modifier = Modifier.padding(bottom = 24.dp)
            )

            // Suggestion buttons
            SuggestionButton(
                text = "Generate a modern and user-friendly UI for a food app",
                modifier = Modifier.padding(bottom = 16.dp)
            )

            SuggestionButton(
                text = "Create acceptance criteria for a login feature",
                modifier = Modifier.padding(bottom = 16.dp)
            )

            SuggestionButton(
                text = "Help me improve user engagement for my app",
                modifier = Modifier.padding(bottom = 32.dp)
            )

            Spacer(modifier = Modifier.weight(1f))
        }

        // Bottom input section
        Box(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
                .padding(24.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(
                        Color(0xFF2A2A3E),
                        RoundedCornerShape(12.dp)
                    )
                    .border(
                        1.dp,
                        Color(0xFFFF6B9D),
                        RoundedCornerShape(12.dp)
                    )
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Attachment icon
                IconButton(
                    onClick = { /* Handle attachment */ },
                    modifier = Modifier.size(24.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.AttachFile,
                        contentDescription = "Attach file",
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }

                // Text input
                BasicTextField(
                    value = inputText,
                    onValueChange = { inputText = it },
                    modifier = Modifier
                        .weight(1f)
                        .padding(horizontal = 12.dp),
                    singleLine = true,
                    decorationBox = { innerTextField ->
                        Box {
                            if (inputText.isEmpty()) {
                                Text(
                                    text = "Create a food app",
                                    color = Color(0xFF888888),
                                    fontSize = 16.sp
                                )
                            }
                            innerTextField()
                        }
                    }
                )

                // Edit icon
                IconButton(
                    onClick = { /* Handle edit */ },
                    modifier = Modifier.size(24.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Edit,
                        contentDescription = "Edit",
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }

                // Send icon
                IconButton(
                    onClick = { /* Handle send */ },
                    modifier = Modifier.size(24.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Send,
                        contentDescription = "Send",
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun SuggestionButton(
    text: String,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .background(
                Color.Transparent,
                RoundedCornerShape(8.dp)
            )
            .border(
                1.dp,
                Color(0xFFFF6B9D),
                RoundedCornerShape(8.dp)
            )
            .padding(16.dp)
    ) {
        Text(
            text = text,
            color = Color.White,
            fontSize = 14.sp,
            lineHeight = 20.sp
        )
    }
}

@Preview(showBackground = true)
@Composable
fun LoginScreenPreview() {
    LoginAppTheme {
        LoginScreen()
    }
}